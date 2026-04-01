from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import load_model, recommend_from_history

app = Flask(__name__)
CORS(app)  # ✅ Flask CORS, not FastAPI

load_model()

@app.route("/")
def home():
    return "ML API Running"

@app.route("/api/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json
        watched = data.get("watched", [])
        print("Incoming watched:", watched)
        results = recommend_from_history(watched, top_n=10)
        return jsonify({"data": results})  # ✅ wrapped in {data:[]} to match frontend
    except Exception as e:
        print("FLASK ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)