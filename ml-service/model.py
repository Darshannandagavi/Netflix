import pandas as pd
import ast
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import vstack

# =============================================================
# HELPER FUNCTIONS
# =============================================================

def clean_genres(x):
    try:
        return " ".join([
            i['name'].replace(" ", "_")
            for i in ast.literal_eval(x)
        ])
    except:
        return ""

def get_top_cast(x):
    try:
        cast = ast.literal_eval(x)
        return " ".join([
            i['name'].replace(" ", "_")
            for i in cast[:3]
        ])
    except:
        return ""

def get_director(x):
    try:
        crew = ast.literal_eval(x)
        for i in crew:
            if i['job'] == 'Director':
                return i['name'].replace(" ", "_")
        return ""
    except:
        return ""

def clean_keywords(x):
    try:
        return " ".join([
            i['name'].replace(" ", "_")
            for i in ast.literal_eval(x)
        ])
    except:
        return ""

def repeat_tokens(text, n):
    text = str(text).strip()
    if not text:
        return ""
    return " ".join([text] * n)

def build_content(row):
    parts = [
        repeat_tokens(row['genres'],   3),
        repeat_tokens(row['cast'],     2),
        repeat_tokens(row['director'], 2),
        str(row['keywords']),
        str(row['overview']),
        str(row['year'])
    ]
    return " ".join(p for p in parts if p.strip())

def format_display(text):
    """Convert underscored tokens back to readable form for display.
    Tom_Hanks → Tom Hanks, Science_Fiction → Science Fiction"""
    return str(text).replace("_", " ").strip()

def print_recommendation_card(rank, movie, score=None, why=None):
    """Print a rich recommendation card for a single movie."""
    title     = movie['title']
    year      = movie.get('year', 'N/A')
    genres    = format_display(movie.get('genres', ''))
    cast      = format_display(movie.get('cast', ''))
    director  = format_display(movie.get('director', ''))
    overview  = str(movie.get('overview', '')).strip()
    is_new    = int(movie.get('is_new', 0) or 0) == 1

    # Truncate overview to 120 chars
    if len(overview) > 120:
        overview = overview[:117] + "..."

    new_tag = " [NEW]" if is_new else ""

    print(f"\n  ┌─ #{rank}{new_tag}")
    print(f"  │  🎬  {title} ({year})")
    print(f"  │  🎭  Genre    : {genres if genres else 'N/A'}")
    print(f"  │  👤  Cast     : {cast if cast else 'N/A'}")
    print(f"  │  🎥  Director : {director if director else 'N/A'}")
    print(f"  │  📖  Overview : {overview if overview else 'N/A'}")
    if score is not None:
        print(f"  │  ⭐  Score    : {score:.2f}")
    if why:
        print(f"  │  💡  Why     : {why}")
    print(f"  └{'─' * 50}")

# =============================================================
# 1. LOAD DATA
# =============================================================
print("Loading CSVs...")

movies   = pd.read_csv("movies_metadata.csv", low_memory=False)
credits  = pd.read_csv("credits.csv")
keywords = pd.read_csv("keywords.csv")

print(f"  movies_metadata : {movies.shape}")
print(f"  credits         : {credits.shape}")
print(f"  keywords        : {keywords.shape}")

# =============================================================
# 2. CLEAN movies_metadata
# =============================================================
print("\nCleaning movies_metadata...")

movies = movies[movies['id'].str.isnumeric()]
movies['id'] = movies['id'].astype(int)
movies = movies[['id', 'title', 'overview', 'genres', 'release_date']]
movies['overview']     = movies['overview'].fillna('')
movies['release_date'] = movies['release_date'].fillna('')
movies['year']         = movies['release_date'].str[:4]
movies['title']        = movies['title'].fillna('')
movies = movies[movies['title'] != '']
movies = movies.drop_duplicates(subset='title')
movies['is_new'] = 0

print(f"  After clean: {movies.shape}")

# =============================================================
# 3. PROCESS CREDITS
# =============================================================
print("\nProcessing credits...")

credits['id']       = credits['id'].astype(int)
credits['cast']     = credits['cast'].apply(get_top_cast)
credits['director'] = credits['crew'].apply(get_director)
credits             = credits[['id', 'cast', 'director']]

dupes = credits['id'].duplicated().sum()
if dupes:
    print(f"  WARNING: {dupes} duplicate IDs in credits — deduplicating")
    credits = credits.drop_duplicates(subset='id')

print(f"  Credits ready: {credits.shape}")

# =============================================================
# 4. PROCESS KEYWORDS
# =============================================================
print("\nProcessing keywords...")

keywords['id']       = keywords['id'].astype(int)
keywords['keywords'] = keywords['keywords'].apply(clean_keywords)

dupes = keywords['id'].duplicated().sum()
if dupes:
    print(f"  WARNING: {dupes} duplicate IDs in keywords — deduplicating")
    keywords = keywords.drop_duplicates(subset='id')

print(f"  Keywords ready: {keywords.shape}")

# =============================================================
# 5. PROCESS GENRES
# =============================================================
print("\nProcessing genres...")
movies['genres'] = movies['genres'].apply(clean_genres)

# =============================================================
# 6. MERGE
# =============================================================
print("\nMerging data...")

before = len(movies)
movies = movies.merge(credits,  on='id', how='left')
after_credits = len(movies)
movies = movies.merge(keywords, on='id', how='left')
after_keywords = len(movies)

print(f"  Before merge        : {before}")
print(f"  After credits merge : {after_credits}  (delta: {after_credits - before:+d})")
print(f"  After keywords merge: {after_keywords}  (delta: {after_keywords - after_credits:+d})")
print(f"  {'Merge clean ✓' if after_keywords == before else 'WARNING: Row count changed!'}")

movies['cast']     = movies['cast'].fillna('')
movies['director'] = movies['director'].fillna('')
movies['keywords'] = movies['keywords'].fillna('')
movies['overview'] = movies['overview'].fillna('')

# =============================================================
# 7. FILL EMPTY KEYWORDS FROM OVERVIEW
# =============================================================
empty_kw = (movies['keywords'] == '').sum()
print(f"\n  Movies with no keywords (filled from overview): {empty_kw}")

movies['keywords'] = movies.apply(
    lambda r: r['keywords'] if r['keywords'].strip()
              else ' '.join(r['overview'].split()[:20]),
    axis=1
)

# =============================================================
# 8. BUILD CONTENT FEATURE
# =============================================================
print("\nBuilding content features...")
movies['content'] = movies.apply(build_content, axis=1)

before_filter = len(movies)
movies = movies[movies['content'].str.len() > 50].reset_index(drop=True)
print(f"  Dropped {before_filter - len(movies)} near-empty content movies")
print(f"  Final dataset: {movies.shape}")

# =============================================================
# 9. TRAIN TF-IDF MODEL
# =============================================================
print("\nTraining TF-IDF model...")

tfidf        = TfidfVectorizer(stop_words='english', min_df=2)
tfidf_matrix = tfidf.fit_transform(movies['content'])

print(f"  Matrix shape   : {tfidf_matrix.shape}")
print(f"  Vocabulary size: {len(tfidf.vocabulary_)}")

# =============================================================
# 10. SAVE MODEL
# =============================================================
with open("model.pkl", "wb") as f:
    pickle.dump({
        "tfidf":        tfidf,
        "tfidf_matrix": tfidf_matrix,
        "movies":       movies
    }, f)

print("\nModel saved to model.pkl ✓")

# =============================================================
# LOAD MODEL
# =============================================================
def load_model():
    global movies, tfidf, tfidf_matrix
    with open("model.pkl", "rb") as f:
        data = pickle.load(f)
    movies       = data["movies"]
    tfidf        = data["tfidf"]
    tfidf_matrix = data["tfidf_matrix"]

# =============================================================
# ADD MOVIE DYNAMICALLY
# =============================================================
def add_new_movie(title, genres, cast, director, overview, year, kw=""):
    global movies, tfidf_matrix

    if title in movies['title'].values:
        print(f"  '{title}' already exists — skipping.")
        return

    genres_norm = " ".join([
        g.strip().replace(" ", "_")
        for g in genres.replace(",", " ").split() if g.strip()
    ])
    cast_norm = " ".join([
        c.strip().replace(" ", "_")
        for c in cast.split(",") if c.strip()
    ])
    director_norm = director.strip().replace(" ", "_")
    kw_norm = " ".join([
        k.strip().replace(" ", "_")
        for k in kw.replace(",", " ").split() if k.strip()
    ]) if kw else ' '.join(overview.split()[:20])

    new_row = pd.Series({
        "id":           -1,
        "title":        title,
        "overview":     overview,
        "genres":       genres_norm,
        "release_date": f"{year}-01-01",
        "year":         str(year),
        "cast":         cast_norm,
        "director":     director_norm,
        "keywords":     kw_norm,
        "content":      "",
        "is_new":       1
    })
    new_row["content"] = build_content(new_row)

    movies       = pd.concat([movies, new_row.to_frame().T], ignore_index=True)
    new_vec      = tfidf.transform([new_row["content"]])
    tfidf_matrix = vstack([tfidf_matrix, new_vec])

    print(f"\n  Added '{title}' at position {len(movies)-1} ✓")

# =============================================================
# RECOMMENDER — returns list of dicts with full movie details
# =============================================================
from collections import Counter

def recommend_from_history(watched_movies, top_n=10, debug=False, show_cards=True):
    """
    watched_movies: list of dicts [{title, overview, genres, cast, director, year}]
    """

    if not watched_movies:
        print("No watched movies provided")
        return []

    # =========================
    # BUILD USER PROFILE (TF-IDF)
    # =========================
    user_profile = " ".join([
        f"{m.get('title','')} {m.get('overview','')} {m.get('genres','')} {m.get('cast','')} {m.get('director','')}"
        for m in watched_movies
    ])

    user_vec = tfidf.transform([user_profile])
    tfidf_scores = cosine_similarity(user_vec, tfidf_matrix).flatten()

    # =========================
    # USER PREFERENCES
    # =========================
    user_genres = set(" ".join([m.get("genres", "") for m in watched_movies]).split())
    user_cast   = set(" ".join([m.get("cast", "") for m in watched_movies]).split())

    # 🔥 Frequency learning (IMPORTANT)
    genre_freq = Counter(" ".join([m.get("genres", "") for m in watched_movies]).split())
    cast_freq  = Counter(" ".join([m.get("cast", "") for m in watched_movies]).split())

    # Year preference
    try:
        years = [float(m.get("year", 0)) for m in watched_movies if m.get("year")]
        avg_year = sum(years) / len(years) if years else None
    except:
        avg_year = None

    scores = []

    # =========================
    # MAIN LOOP
    # =========================
    for pos in range(len(movies)):
        movie = movies.iloc[pos]
        title = str(movie['title'])

        movie_genres = set(str(movie.get('genres', '')).split())
        movie_cast   = set(str(movie.get('cast', '')).split())

        genre_overlap = len(user_genres & movie_genres)
        cast_overlap  = len(user_cast & movie_cast)

        # ❌ REMOVE HARD FILTER → allow fallback
        # if genre_overlap == 0 and cast_overlap == 0:
        #     continue

        score = 0

        # =========================
        # 🎯 TIER-BASED PRIORITY
        # =========================
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

        # =========================
        # 🔥 FREQUENCY BOOST (learning user taste)
        # =========================
        score += sum(genre_freq[g] for g in movie_genres if g in genre_freq)
        score += sum(cast_freq[c] for c in movie_cast if c in cast_freq)

        is_new = int(movie.get('is_new', 0) or 0) == 1

        # =========================
        # WHY EXPLANATION
        # =========================
        matched_genres = list(user_genres & movie_genres)
        matched_cast   = list(user_cast & movie_cast)

        why_parts = []

        if matched_genres:
            why_parts.append(f"Genre: {', '.join(sorted(matched_genres))}")

        if matched_cast:
            why_parts.append(f"Actor: {', '.join(sorted(matched_cast))}")

        # =========================
        # YEAR SIMILARITY
        # =========================
        if is_new:
            why_parts.append("New movie")
        elif avg_year is not None:
            try:
                year_diff = abs(float(movie.get('year', 0)) - avg_year)
                if year_diff <= 5:
                    score += 3
                    why_parts.append(f"Similar era ({movie.get('year')})")
                elif year_diff <= 10:
                    score += 1
            except:
                pass

        # =========================
        # 🔥 TF-IDF CORE SIGNAL
        # =========================
        score += tfidf_scores[pos] * 10

        # Boost new movies (exploration)
        if is_new:
            score *= 3.0

        scores.append({
            "pos": pos,
            "score": score,
            "title": title,
            "year": str(movie.get('year', '')),
            "genres": format_display(movie.get('genres', '')),
            "cast": format_display(movie.get('cast', '')),
            "director": format_display(movie.get('director', '')),
            "overview": str(movie.get('overview', '')).strip(),
            "is_new": is_new,
            "why": " | ".join(why_parts) if why_parts else "Content similarity"
        })

    # =========================
    # SORT + RETURN
    # =========================
    scores.sort(key=lambda x: x['score'], reverse=True)
    results = scores[:top_n]

    if debug:
        print("\n[DEBUG] Top scores:")
        for r in results:
            tag = " ← NEW" if r['is_new'] else ""
            print(f"{r['score']:.2f}  {r['title']}{tag}")

    if show_cards:
        print("\n" + "═" * 55)
        print("  RECOMMENDATIONS (SMART RANKING)")
        print("═" * 55)
        for i, r in enumerate(results, 1):
            print_recommendation_card(
                rank=i,
                movie=r,
                score=r['score'],
                why=r['why']
            )

    return results

# =============================================================
# TEST
# =============================================================
if __name__ == "__main__":

    print("\n" + "=" * 55)
    print("TEST 1: Recommendations before adding new movie")
    print("=" * 55)

    recs = recommend_from_history(
        ["Toy Story", "Jumanji"],
        top_n=5,
        show_cards=True
    )

    print("\n" + "=" * 55)
    print("TEST 2: Add new movie + recommend")
    print("=" * 55)

    add_new_movie(
        title    = "New Tom Hanks Movie",
        genres   = "Comedy, Drama",
        cast     = "Tom Hanks",
        director = "Some Director",
        overview = "A heartwarming comedy drama story about love and friendship.",
        year     = "2024"
    )

    recs = recommend_from_history(
        ["Toy Story", "Jumanji"],
        top_n=5,
        show_cards=True,
        debug=True
    )

    print("\n" + "=" * 55)
    print("TEST 3: Watched movies must not appear in results")
    print("=" * 55)

    rec_titles = [r['title'] for r in recs]
    all_pass = True
    for watched in ["Toy Story", "Jumanji"]:
        if watched in rec_titles:
            print(f"  FAIL — '{watched}' appeared in recommendations!")
            all_pass = False
        else:
            print(f"  PASS — '{watched}' correctly excluded ✓")
    if all_pass:
        print("\n  All exclusion tests passed ✓")