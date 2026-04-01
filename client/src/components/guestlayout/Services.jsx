import React, { useEffect, useState } from "react";

export default function Services() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Popular Movies
        const popularRes = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=8553dc1b146a9c56fa60f25b9f842506&region=IN"
        );
        const popularData = await popularRes.json();

        // Trending Movies
        const trendingRes = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?api_key=8553dc1b146a9c56fa60f25b9f842506"
        );
        const trendingData = await trendingRes.json();

        setPopularMovies(popularData.results);
        setTrendingMovies(trendingData.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const rows = [
    { title: "Trending Now", items: trendingMovies },
    { title: "Popular on Netflix", items: popularMovies },
  ];

  return (
    <>
      <style>{`
        .services {
          background: #141414;
          color: #fff;
          min-height: 100vh;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        /* HERO */
        .hero {
          position: relative;
          height: 75vh;
          background: linear-gradient(to right, #141414 10%, rgba(20,20,20,0) 70%), 
                      url("https://image.tmdb.org/t/p/original${trendingMovies[1]?.backdrop_path || ""}") center/cover no-repeat;
          display: flex;
          align-items: center;
          padding: 0 4%;
        }

        .hero::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 15vh;
          background: linear-gradient(to top, #141414, transparent);
        }

        .hero-content { z-index: 2; max-width: 600px; }
        .hero-title { font-size: 3rem; font-weight: 900; margin-bottom: 10px; }
        .hero-desc { color: #ccc; margin-bottom: 20px; }

        .btn {
          padding: 10px 20px;
          border-radius: 4px;
          margin-right: 10px;
          cursor: pointer;
          border: none;
        }

        .btn-play { background: #fff; color: #000; }
        .btn-info { background: rgba(109,109,110,0.7); color: #fff; }

        /* ROWS */
        .row { padding: 20px 4%; }
        .row-title { font-size: 1.4rem; margin-bottom: 10px; }

        .row-scroll {
          display: flex;
          overflow-x: auto;
          gap: 12px;
        }

        .row-scroll::-webkit-scrollbar { display: none; }

        /* CARD */
        .card {
          flex: 0 0 auto;
          width: 180px;
          border-radius: 6px;
          overflow: hidden;
          background: #222;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: scale(1.08);
          z-index: 5;
        }

        .card img {
          width: 100%;
          height: 260px;
          object-fit: cover;
        }

        .card-title {
          padding: 8px;
          font-size: 0.9rem;
          text-align: center;
        }
      `}</style>

      <div className="services">
        {/* HERO */}
        <div className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              {trendingMovies[1]?.title || "Loading..."}
            </h1>
            <p className="hero-desc">
              {trendingMovies[1]?.overview?.slice(0, 120)}...
            </p>
            <button className="btn btn-play">▶ Play</button>
            <button className="btn btn-info">ⓘ More Info</button>
          </div>
        </div>

        {/* ROWS */}
        {rows.map((row, i) => (
          <div className="row" key={i}>
            <h2 className="row-title">{row.title}</h2>

            <div className="row-scroll">
              {row.items.map((movie) => (
                <div key={movie.id} className="card">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                  />
                  <div className="card-title">{movie.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}