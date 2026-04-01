from flask import Flask, request, jsonify
from recommender import load_model, recommend_from_history
from fastapi.middleware.cors import CORSMiddleware


app = Flask(__name__)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten this after testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load model once
load_model()

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json
        watched = data.get("watched", [])

        print("Incoming watched:", watched)

        # ✅ PASS FULL OBJECTS (NOT TITLES)
        results = recommend_from_history(watched, top_n=10)

        return jsonify(results)

    except Exception as e:
        print("FLASK ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)