import React, { useEffect, useState } from "react";

export default function NetflixLanding() {
  const [movies, setMovies] = useState([]);
useEffect(() => {
  const fetchTrending = async () => {
    try {
      // Kannada movies
      const knRes = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=8553dc1b146a9c56fa60f25b9f842506&with_original_language=kn&region=IN&sort_by=popularity.desc"
      );
      const knData = await knRes.json();

      // Hindi movies
      const hiRes = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=8553dc1b146a9c56fa60f25b9f842506&with_original_language=hi&region=IN&sort_by=popularity.desc"
      );
      const hiData = await hiRes.json();

      // Merge + shuffle (optional)
      const combined = [...knData.results, ...hiData.results];

      // Optional: remove duplicates
      const uniqueMovies = Array.from(
        new Map(combined.map(movie => [movie.id, movie])).values()
      );

      setMovies(uniqueMovies.slice(0, 10)); // Top 10 combined
    } catch (err) {
      console.error("Failed to fetch movies", err);
    }
  };

  fetchTrending();
}, []);
  useEffect(() => {
    const buttons = document.querySelectorAll(".faq-question");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach((i) => {
          i.classList.remove("open");
          i.querySelector(".faq-question").setAttribute(
            "aria-expanded",
            "false",
          );
        });

        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });

    return () => {
      buttons.forEach((btn) => {
        btn.replaceWith(btn.cloneNode(true));
      });
    };
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-bg">
          <img src="/Hero.jpg" alt="" />
        </div>

        <div className="hero-side-gradient-left"></div>
        <div className="hero-overlay"></div>

        {/* HEADER */}

        {/* HERO CONTENT */}
        <div className="hero-content">
          <h1 className="hero-title">Unlimited movies, shows, and more</h1>
          <p className="hero-subtitle">Starts at ₹149. Cancel at any time.</p>

          <p className="email-form-label">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form className="email-form">
            <div className="email-input-wrap">
              <input
                type="email"
                className="email-input"
                id="hero-email"
                placeholder=" "
              />
              <label className="email-label" htmlFor="hero-email">
                Email address
              </label>
            </div>

            <button type="submit" className="get-started-btn">
              Get Started →
            </button>
          </form>
        </div>

        <div className="curve-divider">
          <div className="curve-inner"></div>
        </div>
      </section>

      {/* BELOW HERO */}
      <div className="below-hero">
        <section className="section">
          <h2 className="section-title">Trending Now</h2>

          <div className="top10-scroll">
            {movies.map((movie, i) => (
              <div key={movie.id} className="top10-item">
                <div className="top10-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <span className="top10-rank">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <h2 className="faq-title">Frequently Asked Questions</h2>

          <ul className="faq-list">
            {[
              {
                q: "What is Netflix?",
                a: "Netflix is a streaming service offering movies, shows and more.",
              },
              {
                q: "How much does Netflix cost?",
                a: "Plans start at ₹149/month.",
              },
              {
                q: "Where can I watch?",
                a: "Anywhere on any device.",
              },
            ].map((item, i) => (
              <li key={i} className="faq-item">
                <button className="faq-question">
                  {item.q}
                  <span>+</span>
                </button>
                <div className="faq-answer">{item.a}</div>
              </li>
            ))}
          </ul>
        </section>

        <style>
          {`
           
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @font-face {
    font-family: "Netflix Sans";
    font-weight: 100; src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Th.woff2) format("woff2");
  }
  @font-face {
    font-family: "Netflix Sans";
    font-weight: 300; src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff2) format("woff2");
  }
  @font-face {
    font-family: "Netflix Sans";
    font-weight: 400; src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2) format("woff2");
  }
  @font-face {
    font-family: "Netflix Sans";
    font-weight: 500; src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2) format("woff2");
  }
  @font-face {
    font-family: "Netflix Sans";
    font-weight: 700; src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2) format("woff2");
  }
  @font-face {
    font-family: "Netflix Sans";
    font-weight: 900; src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Blk.woff2) format("woff2");
  }

  :root {
    --netflix-red: #e50914;
    --netflix-red-hover: #c1111a;
    --netflix-red-active: #99161d;
    --text-white: #fff;
    --text-gray: rgba(255,255,255,0.7);
    --text-gray-dim: rgba(255,255,255,0.5);
    --bg-dark: #141414;
    --bg-card: #222;
    --border-gray: rgba(128,128,128,0.4);
    --input-bg: rgba(22,22,22,0.7);
  }

  html, body {
    background: #000;
    color: var(--text-white);
    font-family: "Netflix Sans", "Helvetica Neue", Segoe UI, Roboto, Ubuntu, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── HERO SECTION ── */
  .hero-section {
    position: relative;
    width: 100%;
    min-height: calc(100vh + 85px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  /* Red side gradients from Netflix source */
  .hero-side-gradient-left {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(11% 56% at 17% 50%, #461518 0%, transparent 100%),
                radial-gradient(11% 56% at 83% 50%, #461518 0%, transparent 100%);
    pointer-events: none;
  }

  /* Top-to-bottom fade overlay */
  .hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.67) 0%,
      rgba(0, 0, 0, 0.62) 50%,
      rgba(0,0,0,0.90) 100%
    );
    pointer-events: none;
  }

  /* ── HEADER ── */
  .header {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 4%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .netflix-logo svg {
    width: 148px;
    height: 40px;
    fill: var(--netflix-red);
    display: block;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .lang-select {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(22,22,22,0.7);
    border: 1px solid rgba(128,128,128,0.7);
    border-radius: 4px;
    padding: 6px 32px 6px 36px;
    color: var(--text-white);
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    appearance: none;
    position: relative;
  }

  .lang-picker-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .lang-icon {
    position: absolute;
    left: 10px;
    z-index: 1;
    pointer-events: none;
    color: #fff;
  }

  .lang-caret {
    position: absolute;
    right: 10px;
    pointer-events: none;
    color: #fff;
  }

  .sign-in-btn {
    background: var(--netflix-red);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 7px 17px;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: background 0.25s;
    min-height: 2rem;
  }

  .sign-in-btn:hover { background: var(--netflix-red-hover); }

  /* ── HERO CONTENT ── */
  .hero-content {
    position: relative;
    z-index: 5;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1.5rem 4rem;
    margin-top: 5rem;
  }

  .hero-title {
    font-size: clamp(1.8rem, 4vw, 3.5rem);
    font-weight: 900;
    line-height: 1.2;
    color: #fff;
    max-width: 640px;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    font-weight: 400;
    color: #fff;
    margin-bottom: 1.5rem;
    max-width: 500px;
  }

  .email-form-label {
    font-size: 1.125rem;
    color: #fff;
    margin-bottom: 1rem;
    max-width: 660px;
  }

  .email-form {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
    max-width: 580px;
    align-items: flex-start;
  }

  .email-input-wrap {
    flex: 1;
    position: relative;
  }

  .email-input {
    width: 100%;
    background: rgba(22,22,22,0.7);
    border: 1px solid rgba(128,128,128,0.7);
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    font-family: inherit;
    padding: 20px 16px 8px 16px;
    caret-color: #fff;
    outline: none;
    transition: border-color 0.2s;
  }

  .email-input:focus {
    border-color: #fff;
    outline: 2px solid rgba(255,255,255,0.3);
  }

  .email-label {
    position: absolute;
    left: 16px;
    top: 14px;
    color: rgba(255,255,255,0.7);
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.2s;
    line-height: 1;
  }

  .email-input:focus + .email-label,
  .email-input:not(:placeholder-shown) + .email-label {
    top: 5px;
    font-size: 0.75rem;
  }

  .get-started-btn {
    background: var(--netflix-red);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0 24px;
    height: 56px;
    font-size: 1.125rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .get-started-btn:hover { background: var(--netflix-red-hover); }

  .get-started-btn svg { width: 24px; height: 24px; }

  /* Curve divider */
  .curve-divider {
    position: relative;
    z-index: 4;
    width: 100%;
    height: 100px;
    overflow: hidden;
  }

  .curve-inner {
    position: absolute;
    height: 100%;
    width: 150%;
    left: -25%;
    background: radial-gradient(50% 500% at 50% -420%, rgba(64,97,231,0.4) 80%, rgba(0,0,0,0.1) 100%), #000;
    border: solid 4px transparent;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    border-bottom: none;
    background-clip: padding-box;
  }

  .curve-inner::before {
    content: '';
    position: absolute;
    top: -4px; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin-top: -4px;
    border-radius: inherit;
    background: linear-gradient(to right, rgba(33,13,22,1) 16%, rgba(184,40,105,1), rgba(229,9,20,1), rgba(184,40,105,1), rgba(33,13,22,1) 84%);
  }

  /* ── BELOW HERO (white bg) ── */
  .below-hero {
    background: #000;
    padding: 0 4%;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  /* ── TRENDING NOW ── */
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 500;
    color: #fff;
    margin-bottom: 1rem;
  }

  .top10-scroll {
    display: flex;
    overflow-x: auto;
    gap: 0;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    padding: 0.3rem 0;
  }

  .top10-scroll::-webkit-scrollbar { display: none; }

  .top10-item {
    flex-shrink: 0;
    scroll-snap-align: start;
    display: flex;
    align-items: flex-end;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    position: relative;
  }

  .top10-card {
    position: relative;
    border-radius: 8px;
    background: #232323;
    width: 110px;
    height: 154px;
    flex-shrink: 0;
    overflow: hidden;
    transition: transform 0.2s;
  }

  .top10-item:hover .top10-card { transform: scale(1.05); z-index: 2; }

  .top10-card img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .top10-rank {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: -18px;
    font-size: 6.5rem;
    font-weight: 700;
    line-height: 1;
    color: rgb(65,65,65);
    -webkit-text-stroke: 4px rgb(255,255,255);
    text-shadow: 0 0 24px rgba(0,0,0,0.5);
    user-select: none;
  }

  /* ── MORE REASONS TO JOIN ── */
  .reasons-title {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 500;
    color: #fff;
    margin-bottom: 1rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 12px;
    margin-bottom: 3rem;
  }

  .value-card {
    border-radius: 1rem;
    background: linear-gradient(149deg, #192247 0%, #210e17 99%);
    backdrop-filter: blur(30px);
    padding: 1.5rem 1rem 6rem 1rem;
    position: relative;
    overflow: hidden;
    min-height: 200px;
  }

  .value-card h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 0.5rem;
  }

  .value-card p {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255,255,255,0.7);
  }

  .value-card-icon {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
  }

  /* ── FAQ ── */
  .faq-title {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 500;
    color: #fff;
    margin-bottom: 1rem;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 3rem;
  }

  .faq-item {
    background: #2d2d2d;
    color: #fff;
    transition: background 0.25s;
    border-radius: 0;
  }

  .faq-item:hover { background: #414141; }

  .faq-question {
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: clamp(0.9rem, 2vw, 1rem);
    text-align: left;
    padding: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .faq-plus {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    fill: currentColor;
    transition: transform 0.25s;
  }

  .faq-item.open .faq-plus { transform: rotate(45deg); }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    padding: 0 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #fff;
    background: #2d2d2d;
  }

  .faq-item.open .faq-answer {
    max-height: 500px;
    padding: 1.5rem;
  }

  /* ── FOOTER EMAIL ── */
  

  /* Responsive */
  @media (max-width: 600px) {
    .email-form { flex-direction: column; }
    .get-started-btn { width: 100%; justify-content: center; }
    .header { padding: 0 16px; height: 62px; }
    .netflix-logo svg { width: 89px; height: 24px; }
    .hero-content { padding: 0 1rem 3rem; }
    .cards-grid { grid-template-columns: 1fr; }
    .footer-email-form { flex-direction: column; align-items: center; }
  }

  @media (min-width: 960px) {
    .hero-title { font-size: 3.5rem; }
    .below-hero { padding: 0 5rem; }
  }

  @media (min-width: 1280px) {
    .below-hero { padding: 0 9.25rem; }
    .footer { padding: 3rem 9.25rem 6rem; }
  }

            `}
        </style>
      </div>
    </>
  );
}
