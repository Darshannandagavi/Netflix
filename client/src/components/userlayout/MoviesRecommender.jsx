import React, { useEffect, useState } from "react";

const API_KEY = "8553dc1b146a9c56fa60f25b9f842506";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red:      #E50914;
    --red-dim:  #b0060f;
    --bg:       #0f0f0f;
    --bg2:      #181818;
    --bg3:      #222222;
    --text:     #e5e5e5;
    --muted:    #a3a3a3;
    --border:   rgba(255,255,255,0.08);
    --card-w:   160px;
    --card-h:   240px;
    --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  body { background: var(--bg); }

  ::-webkit-scrollbar { height: 4px; width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--red-dim); border-radius: 2px; }
  ::-webkit-scrollbar { height: 6px; width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(229, 9, 20, 0.6); border-radius: 10px; transition: background 0.3s ease; }
  ::-webkit-scrollbar-thumb:hover { background: #e50914; }
  .nf-row::-webkit-scrollbar { height: 5px; }
  .nf-row::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.25); }
  .nf-row::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.5); }
  * { scrollbar-width: thin; scrollbar-color: rgba(229, 9, 20, 0.6) transparent; }

  .nf-app {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .nf-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
    background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nf-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem; letter-spacing: 2px;
    color: var(--red);
    text-shadow: 0 0 20px rgba(229,9,20,0.5);
    user-select: none;
  }
  .nf-nav-badge {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.78rem; color: var(--muted);
  }
  .nf-nav-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--red); animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.5; transform:scale(1.4); }
  }

  .nf-hero {
    position: relative; height: 280px;
    display: flex; align-items: flex-end; padding: 40px 48px;
    overflow: hidden;
    background: linear-gradient(135deg, #0f0f0f 0%, #1a0a0a 50%, #0f0f0f 100%);
  }
  .nf-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(229,9,20,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(229,9,20,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .nf-hero-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 20%, #0f0f0f 80%);
  }
  .nf-hero-content { position: relative; z-index: 2; }
  .nf-hero-eyebrow {
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    color: var(--red); margin-bottom: 10px;
  }
  .nf-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    letter-spacing: 3px; line-height: 1; color: #fff;
    text-shadow: 0 2px 20px rgba(0,0,0,0.8); margin-bottom: 12px;
  }
  .nf-hero-sub {
    font-size: 0.85rem; color: var(--muted);
    max-width: 420px; line-height: 1.5;
  }
  .nf-hero-accent {
    position: absolute; right: 48px; top: 50%; transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 9rem; color: rgba(229,9,20,0.06);
    letter-spacing: -4px; user-select: none; pointer-events: none;
  }

  .nf-section { padding: 32px 0 20px; }
  .nf-section-header {
    display: flex; align-items: baseline; gap: 14px;
    padding: 0 48px; margin-bottom: 18px;
  }
  .nf-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem; letter-spacing: 2px; color: #fff;
  }
  .nf-section-count {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: var(--red);
    background: rgba(229,9,20,0.1); border: 1px solid rgba(229,9,20,0.2);
    padding: 2px 8px; border-radius: 3px;
  }
  .nf-section-divider {
    width: 48px; height: 2px; background: var(--red);
    margin: 0 48px 20px; border-radius: 1px;
  }

  .nf-row-wrap { position: relative; }
  .nf-row {
    display: flex; gap: 10px;
    padding: 10px 48px 20px;
    overflow-x: auto; scrollbar-width: thin; scroll-behavior: smooth;
  }
  .nf-row::-webkit-scrollbar { height: 3px; }

  /* ── CARD ── */
  .nf-card {
    flex: 0 0 var(--card-w); width: var(--card-w);
    border-radius: 6px; overflow: visible;
    cursor: pointer; position: relative;
    transition: transform var(--transition), z-index 0s;
  }
  .nf-card:hover { transform: scale(1.12) translateY(-8px); z-index: 10; }
  .nf-card-inner {
    border-radius: 6px; overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    background: var(--bg2);
    transition: box-shadow var(--transition);
  }
  .nf-card:hover .nf-card-inner {
    box-shadow: 0 16px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(229,9,20,0.3);
  }
  .nf-card-poster {
    width: 100%; height: var(--card-h);
    object-fit: cover; display: block;
    transition: filter var(--transition);
  }
  .nf-card:hover .nf-card-poster { filter: brightness(0.55); }

  .nf-card-overlay {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 12px 10px 10px;
    opacity: 0; transition: opacity var(--transition);
    background: linear-gradient(0deg, rgba(0,0,0,0.92) 0%, transparent 60%);
    border-radius: 6px;
  }
  .nf-card:hover .nf-card-overlay { opacity: 1; }
  .nf-card-title-ov {
    font-size: 0.72rem; font-weight: 600;
    color: #fff; line-height: 1.3; margin-bottom: 6px;
    overflow: hidden; display: -webkit-box;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  }

  /* ── TOGGLE BUTTON — 3 states ── */
  .nf-card-btn {
    width: 100%; padding: 6px 0;
    border: none; border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.5px; cursor: pointer;
    transition: background var(--transition), transform 0.1s, color var(--transition);
    display: flex; align-items: center;
    justify-content: center; gap: 5px;
  }

  /* default — not watched */
  .nf-card-btn.unwatch {
    background: var(--red); color: #fff;
  }
  .nf-card-btn.unwatch:hover { background: #f40612; transform: scale(1.02); }

  /* watched state — green tick */
  .nf-card-btn.watched {
    background: rgba(34,197,94,0.15);
    border: 1px solid rgba(34,197,94,0.35);
    color: #4ade80;
  }

  /* watched hover — turns into red "Unmark" */
  .nf-card-btn.watched:hover {
    background: rgba(229,9,20,0.2);
    border-color: rgba(229,9,20,0.4);
    color: #ff8080;
    transform: scale(1.02);
  }

  /* loading spinner state */
  .nf-card-btn.loading {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--muted);
    cursor: wait;
  }
  .nf-card-btn-spinner {
    width: 10px; height: 10px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* watched ring on poster */
  .nf-card.is-watched .nf-card-inner {
    box-shadow: 0 0 0 2px rgba(34,197,94,0.5);
  }

  .nf-card-label {
    padding: 8px 6px 4px;
    font-size: 0.72rem; font-weight: 500;
    color: var(--muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    transition: color var(--transition);
  }
  .nf-card:hover .nf-card-label { color: #fff; }

  /* ── WATCHED CHIPS ── */
  .nf-chips {
    display: flex; flex-wrap: wrap; gap: 8px;
    padding: 0 48px 8px;
  }
  .nf-chip {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 4px 4px 8px;
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 20px; font-size: 0.75rem; color: var(--text);
    animation: chipIn 0.3s ease both;
    transition: border-color 0.2s, background 0.2s;
  }
  .nf-chip:hover {
    border-color: rgba(229,9,20,0.3);
    background: rgba(229,9,20,0.05);
  }
  @keyframes chipIn {
    from { opacity:0; transform:scale(0.85) translateY(4px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  .nf-chip-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #4ade80; flex-shrink: 0;
  }
  /* ── remove X on chip ── */
  .nf-chip-remove {
    width: 20px; height: 20px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--muted); font-size: 0.65rem;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    line-height: 1;
  }
  .nf-chip-remove:hover {
    background: rgba(229,9,20,0.25);
    border-color: rgba(229,9,20,0.4);
    color: #ff8080;
  }

  /* ── REC CARD ── */
  .nf-rec-card {
    flex: 0 0 200px; width: 200px;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; overflow: hidden;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    animation: recIn 0.4s ease both;
  }
  .nf-rec-card:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(229,9,20,0.4);
    border-color: rgba(229,9,20,0.35);
  }
  @keyframes recIn {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .nf-rec-top {
    background: linear-gradient(135deg, #1a0505, #1f1010);
    padding: 14px 14px 10px;
    border-bottom: 1px solid var(--border);
  }
  .nf-rec-score-row {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 8px;
  }
  .nf-rec-score {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.6rem; color: var(--red); line-height: 1;
  }
  .nf-rec-score-label {
    font-size: 0.6rem; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
  }
  .nf-score-bar {
    height: 2px; background: rgba(255,255,255,0.1);
    border-radius: 1px; overflow: hidden;
  }
  .nf-score-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--red), #ff6b6b);
    border-radius: 1px;
    transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .nf-rec-body { padding: 12px 14px; }
  .nf-rec-title {
    font-weight: 600; font-size: 0.82rem; color: #fff;
    line-height: 1.35; margin-bottom: 4px;
    overflow: hidden; display: -webkit-box;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  }
  .nf-rec-year { font-size: 0.7rem; color: var(--muted); margin-bottom: 6px; }
  .nf-rec-genres { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
  .nf-genre-pill {
    font-size: 0.6rem; font-weight: 600;
    letter-spacing: 0.5px; text-transform: uppercase;
    padding: 2px 7px;
    background: rgba(229,9,20,0.12); border: 1px solid rgba(229,9,20,0.2);
    border-radius: 10px; color: #ff8080;
  }
  .nf-rec-overview {
    font-size: 0.68rem; color: var(--muted); line-height: 1.5;
    overflow: hidden; display: -webkit-box;
    -webkit-line-clamp: 3; -webkit-box-orient: vertical;
  }

  .nf-empty {
    display: flex; flex-direction: column;
    align-items: center; gap: 12px;
    padding: 48px; color: var(--muted);
    font-size: 0.85rem; text-align: center;
  }
  .nf-empty-icon { font-size: 2.5rem; opacity: 0.4; }

  .nf-shimmer {
    background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite; border-radius: 6px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .nf-footer {
    margin-top: 60px; padding: 24px 48px;
    border-top: 1px solid var(--border);
    text-align: center; font-size: 0.72rem;
    color: rgba(163,163,163,0.4); letter-spacing: 1px;
  }
`;

/* ─── SHIMMER ── */
function ShimmerRow({ count = 8 }) {
  return (
    <div className="nf-row">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ flex: "0 0 160px", width: 160 }}>
          <div className="nf-shimmer" style={{ width: "100%", height: 240, borderRadius: 6 }} />
          <div className="nf-shimmer" style={{ height: 10, marginTop: 8, borderRadius: 4, width: "70%" }} />
        </div>
      ))}
    </div>
  );
}

/* ─── MOVIE CARD ── */
function MovieCard({ movie, isWatched, isLoading, onToggle }) {
  return (
    <div className={`nf-card${isWatched ? " is-watched" : ""}`}>
      <div className="nf-card-inner">
        <img
          className="nf-card-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="nf-card-overlay">
          <p className="nf-card-title-ov">{movie.title}</p>

          {/* ── TOGGLE BUTTON ── */}
          <button
            className={`nf-card-btn ${
              isLoading ? "loading" : isWatched ? "watched" : "unwatch"
            }`}
            onClick={() => !isLoading && onToggle(movie)}
            title={isWatched ? "Click to unmark as watched" : "Mark as watched"}
          >
            {isLoading ? (
              <>
                <span className="nf-card-btn-spinner" />
                Loading…
              </>
            ) : isWatched ? (
              // Shows "✓ Watched" normally, "✕ Unmark" on hover via CSS
              <>
                <span className="btn-default-text">✓ Watched</span>
                <span className="btn-hover-text" style={{ display: "none" }}>✕ Unmark</span>
              </>
            ) : (
              "+ Mark Watched"
            )}
          </button>
        </div>
      </div>
      <p className="nf-card-label">{movie.title}</p>
    </div>
  );
}

/* ─── REC CARD ── */
function RecCard({ rec, index }) {
  const [poster, setPoster] = React.useState(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(rec.title)}`
        );
        const data = await res.json();
        if (data.results?.length > 0) setPoster(data.results[0].poster_path);
      } catch (err) {
        console.error("Poster fetch error:", err);
      }
    };
    fetchPoster();
  }, [rec.title]);

  const genreList = rec.genres ? rec.genres.split(" ").filter(Boolean).slice(0, 3) : [];
  const scorePercent = Math.min(100, Math.round((rec.score || 0) * 100));

  return (
    <div className="nf-rec-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <img
        src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={rec.title}
        style={{ width: "100%", height: "260px", objectFit: "cover" }}
      />
      <div className="nf-rec-top">
        <div className="nf-rec-score-row">
          <div>
            <div className="nf-rec-score">{rec.score?.toFixed(2)}</div>
            <div className="nf-rec-score-label">Match Score</div>
          </div>
          <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>#{index + 1}</span>
        </div>
        <div className="nf-score-bar">
          <div className="nf-score-fill" style={{ width: `${scorePercent}%` }} />
        </div>
      </div>
      <div className="nf-rec-body">
        <p className="nf-rec-title">{rec.title}</p>
        <p className="nf-rec-year">{rec.year}</p>
        {genreList.length > 0 && (
          <div className="nf-rec-genres">
            {genreList.map((g, i) => (
              <span key={i} className="nf-genre-pill">{g}</span>
            ))}
          </div>
        )}
        <p className="nf-rec-overview">{rec.overview}</p>
      </div>
    </div>
  );
}

/* ─── MAIN ── */
export default function MovieRecommender() {
  const [movies,          setMovies]          = useState([]);
  const [watched,         setWatched]         = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingId,       setLoadingId]       = useState(null); // which card is mid-toggle

  // Fetch trending
  useEffect(() => {
    const fetchMovies = async () => {
      const res  = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
      const data = await res.json();
      setMovies(data.results.slice(0, 15));
    };
    fetchMovies();
  }, []);

  // Refresh recommendations whenever watched list changes
  const refreshRecs = async (updatedWatched) => {
    if (updatedWatched.length === 0) {
      setRecommendations([]);
      return;
    }
    try {
      const res    = await fetch("https://netflix-afuq.onrender.com/api/recommend", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ watched: updatedWatched }),
      });
      const result = await res.json();
      setRecommendations(Array.isArray(result?.data) ? result.data : []);
    } catch (err) {
      console.error("Recommend error:", err);
    }
  };

  // ── TOGGLE WATCHED ───────────────────────────────────────────
  const toggleWatched = async (movie) => {
    const alreadyWatched = watched.find((m) => m.title === movie.title);

    // ── UNMARK ──────────────────────────────────────────────────
    if (alreadyWatched) {
      const updated = watched.filter((m) => m.title !== movie.title);
      setWatched(updated);
      await refreshRecs(updated);
      return;
    }

    // ── MARK ────────────────────────────────────────────────────
    setLoadingId(movie.id); // show spinner on this card
    try {
      const [detailsRes, creditsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`),
      ]);
      const details = await detailsRes.json();
      const credits = await creditsRes.json();

      const genres      = details.genres.map((g) => g.name).join(" ");
      const cast        = credits.cast.slice(0, 3).map((c) => c.name).join(" ");
      const directorObj = credits.crew.find((c) => c.job === "Director");
      const director    = directorObj ? directorObj.name : "";
      const language    = details.original_language;

      const movieData = {
        title:    movie.title,
        overview: movie.overview,
        year:     movie.release_date?.split("-")[0] || "2024",
        genres,
        cast,
        director,
        language,
      };

      const updated = [...watched, movieData];
      setWatched(updated);
      await refreshRecs(updated);
    } catch (err) {
      console.error("Toggle error:", err);
    } finally {
      setLoadingId(null); // clear spinner
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="nf-app">

        {/* ── HERO ── */}
        <div className="nf-hero">
          <div className="nf-hero-grid" />
          <div className="nf-hero-vignette" />
          <div className="nf-hero-content">
            <h1 className="nf-hero-title">Your Next<br />Obsession Awaits</h1>
            <p className="nf-hero-sub">
              Mark what you've watched — get hyper-personalised picks built
              around your taste, not an algorithm's guess.
            </p>
          </div>
          <div className="nf-hero-accent">MOVIES</div>
        </div>

        {/* ── TRENDING ROW ── */}
        <section className="nf-section">
          <div className="nf-section-header">
            <h2 className="nf-section-title">Trending This Week</h2>
            {movies.length > 0 && (
              <span className="nf-section-count">{movies.length} titles</span>
            )}
          </div>
          <div className="nf-section-divider" />

          {movies.length === 0 ? (
            <ShimmerRow count={8} />
          ) : (
            <div className="nf-row">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isWatched={!!watched.find((m) => m.title === movie.title)}
                  isLoading={loadingId === movie.id}
                  onToggle={toggleWatched}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── WATCH HISTORY ── */}
        {watched.length > 0 && (
          <section className="nf-section">
            <div className="nf-section-header">
              <h2 className="nf-section-title">Your Watch History</h2>
              <span className="nf-section-count">{watched.length} marked</span>
            </div>
            <div className="nf-section-divider" />
            <div className="nf-chips">
              {watched.map((w, i) => {
                const genres = w.genres?.split(" ").slice(0, 2);
                const cast   = w.cast?.split(" ").slice(0, 2);
                return (
                  <div
                    key={i}
                    className="nf-chip"
                    style={{ flexDirection: "column", alignItems: "flex-start", padding: "8px 8px 8px 12px" }}
                  >
                    {/* title row + remove button */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="nf-chip-dot" />
                        <span style={{ fontWeight: 600 }}>{w.title}</span>
                      </div>
                      {/* ── ✕ REMOVE CHIP BUTTON ── */}
                      <button
                        className="nf-chip-remove"
                        onClick={() => toggleWatched({ title: w.title, id: "_chip_" })}
                        title={`Remove ${w.title} from watch history`}
                      >
                        ✕
                      </button>
                    </div>
                    {genres?.length > 0 && (
                      <div style={{ fontSize: "0.65rem", color: "#aaa", marginTop: 4 }}>
                        🎬 {genres.join(", ")}
                      </div>
                    )}
                    {cast?.length > 0 && (
                      <div style={{ fontSize: "0.65rem", color: "#888" }}>
                        👤 {cast.join(", ")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── RECOMMENDATIONS ── */}
        <section className="nf-section">
          <div className="nf-section-header">
            <h2 className="nf-section-title">Recommended For You</h2>
            {recommendations.length > 0 && (
              <span className="nf-section-count">{recommendations.length} picks</span>
            )}
          </div>
          <div className="nf-section-divider" />

          {recommendations.length === 0 ? (
            <div className="nf-empty">
              <div className="nf-empty-icon">🎬</div>
              <p>Hover a card and mark movies as watched to unlock your personal picks</p>
            </div>
          ) : (
            <div className="nf-row">
              {recommendations.map((rec, i) => (
                <RecCard key={i} rec={rec} index={i} />
              ))}
            </div>
          )}
        </section>

        <div className="nf-footer">TMDB · AI-Powered · {new Date().getFullYear()}</div>
      </div>
    </>
  );
}
