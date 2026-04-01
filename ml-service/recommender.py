import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

movies = None
tfidf = None
tfidf_matrix = None

def load_model():
    global movies, tfidf, tfidf_matrix

    with open("model.pkl", "rb") as f:
        data = pickle.load(f)

    movies = data["movies"]
    tfidf = data["tfidf"]
    tfidf_matrix = data["tfidf_matrix"]

from collections import Counter

def recommend_from_history(watched_movies, top_n=10):
    if not watched_movies:
        return []

    # =========================
    # BUILD PROFILE FROM INPUT (NO DATASET DEPENDENCY)
    # =========================
    user_profile = " ".join([
        f"{m.get('title','')} {m.get('overview','')} {m.get('genres','')} {m.get('cast','')} {m.get('director','')}"
        for m in watched_movies
    ])

    if not user_profile.strip():
        return []

    user_vec = tfidf.transform([user_profile])
    tfidf_scores = cosine_similarity(user_vec, tfidf_matrix).flatten()

    # =========================
    # USER PREFERENCES
    # =========================
    user_genres = set(" ".join([m.get("genres", "") for m in watched_movies]).split())
    user_cast   = set(" ".join([m.get("cast", "") for m in watched_movies]).split())

    genre_freq = Counter(" ".join([m.get("genres", "") for m in watched_movies]).split())
    cast_freq  = Counter(" ".join([m.get("cast", "") for m in watched_movies]).split())

    results = []

    for i in range(len(movies)):
        movie = movies.iloc[i]

        movie_genres = set(str(movie.get('genres', '')).split())
        movie_cast   = set(str(movie.get('cast', '')).split())

        genre_overlap = len(user_genres & movie_genres)
        cast_overlap  = len(user_cast & movie_cast)

        score = 0

        # 🎯 TIER LOGIC
        if cast_overlap > 0 and genre_overlap >= 2:
            score += 20
        elif cast_overlap > 0 and genre_overlap >= 1:
            score += 15
        elif genre_overlap >= 2:
            score += 10
        elif cast_overlap > 0:
            score += 8
        elif genre_overlap >= 1:
            score += 5

        # 🔥 FREQUENCY BOOST
        score += sum(genre_freq[g] for g in movie_genres if g in genre_freq)
        score += sum(cast_freq[c] for c in movie_cast if c in cast_freq)

        # 🔥 TF-IDF SIGNAL
        score += tfidf_scores[i] * 10

        results.append({
            "title": movie['title'],
            "year": movie.get('year', ''),
            "genres": str(movie.get('genres', '')).replace("_", " "),
            "overview": str(movie.get('overview', ''))[:120],
            "score": float(score)
        })

    results = sorted(results, key=lambda x: x['score'], reverse=True)

    return results[:top_n]