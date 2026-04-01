import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../axiosConfig";

const ADMIN_NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .nf-admin-navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 52px;
    background: #0f0f0f;
    border-bottom: 1px solid rgba(229,9,20,0.15);
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }

  /* ── LEFT ── */
  .nf-admin-left {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .nf-admin-logo-icon {
    width: 30px; height: 30px;
    background: #E50914;
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 900;
    color: #fff; letter-spacing: 0.5px;
    flex-shrink: 0;
  }
  .nf-admin-wordmark {
    font-size: 1.1rem;
    font-weight: 800;
    font-style: italic;
    letter-spacing: -0.5px;
    color: #fff;
    line-height: 1;
  }
  .nf-admin-wordmark span {
    color: #E50914;
  }
  .nf-admin-badge {
    padding: 2px 8px;
    background: rgba(229,9,20,0.12);
    border: 1px solid rgba(229,9,20,0.3);
    border-radius: 3px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #E50914;
    margin-left: 2px;
  }

  /* ── RIGHT ── */
  .nf-admin-right {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* nav links */
  .nf-admin-navlink {
    position: relative;
    padding: 8px 14px;
    border-radius: 4px;
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    color: #888;
    letter-spacing: 0.1px;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  .nf-admin-navlink:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }
  .nf-admin-navlink.active {
    color: #fff;
    font-weight: 700;
  }
  .nf-admin-navlink.active::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 50%;
    transform: translateX(-50%);
    width: 18px; height: 2px;
    background: #E50914;
    border-radius: 1px;
  }

  /* separator */
  .nf-admin-sep {
    width: 1px; height: 22px;
    background: rgba(255,255,255,0.08);
    margin: 0 10px;
    flex-shrink: 0;
  }

  /* logout button */
  .nf-admin-logout {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    background: transparent;
    border: 1px solid rgba(229,9,20,0.25);
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    color: #E50914;
    letter-spacing: 0.2px;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .nf-admin-logout:hover {
    background: rgba(229,9,20,0.1);
    border-color: rgba(229,9,20,0.5);
    color: #ff3b3b;
  }
  .nf-admin-logout-icon { font-size: 0.85rem; }
`;

function AdminNavbar() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = async () => {
    try { await API.post("/auth/logout"); } catch {}
    navigate("/login");
  };

  const links = [
    { to: "/admin",           label: "Dashboard" },
    { to: "/admin/movies",    label: "Movies"    },
    { to: "/admin/users",     label: "Users"     },
    { to: "/admin/feedbacks", label: "Feedbacks" },
    { to: "/admin/contacts",  label: "Messages"  },
    { to: "/admin/profile",  label: "Profile"  },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{ADMIN_NAV_STYLES}</style>

      <nav className="nf-admin-navbar">

        <div className="nf-navbar-left">
          <Link to="/movies" className="logo">
            <svg viewBox="0 0 111 30" width="100" fill="#e50914">
              <path d="M 105.062 14.2806 L 110.999 30 C 109.249 29.7497 107.5 29.4367 105.718 29.1555 L 102.374 20.4686 L 98.9371 28.4375 C 97.25 28.1563 95.5928 28.0617 93.9057 27.8433 L 99.9372 14.0932 L 94.4681 -5.68434e-14 L 99.5313 -5.68434e-14 L 102.593 7.87422 L 105.875 -5.68434e-14 L 110.999 -5.68434e-14 L 105.062 14.2806 Z M 90.4687 -5.68434e-14 L 85.875 -5.68434e-14 L 85.875 27.25 C 87.3746 27.3437 88.9371 27.4056 90.4687 27.593 L 90.4687 -5.68434e-14 Z M 81.9055 26.9369 C 77.7186 26.6557 73.5308 26.4064 69.2502 26.3117 L 69.2502 -5.68434e-14 L 73.9366 -5.68434e-14 L 73.9366 21.8746 C 76.6248 21.9374 79.312 22.1558 81.9055 22.2804 L 81.9055 26.9369 Z M 64.2497 10.6561 L 64.2497 15.3435 L 57.8442 15.3435 L 57.8442 25.9996 L 53.2187 25.9996 L 53.2187 -5.68434e-14 L 66.3436 -5.68434e-14 L 66.3436 4.68741 L 57.8442 4.68741 L 57.8442 10.6561 L 64.2497 10.6561 Z M 45.3435 4.68741 L 45.3435 26.2499 C 43.781 26.2499 42.1876 26.2499 40.6561 26.3117 L 40.6561 4.68741 L 35.8122 4.68741 L 35.8122 -5.68434e-14 L 50.2184 -5.68434e-14 L 50.2184 4.68741 L 45.3435 4.68741 Z M 30.7498 15.5928 C 28.6878 15.5928 26.2499 15.5928 24.5 15.6875 L 24.5 22.6563 C 27.25 22.4679 30 22.2495 32.781 22.1558 L 32.781 26.6557 L 19.8125 27.6877 L 19.8125 -5.68434e-14 L 32.781 -5.68434e-14 L 32.781 4.68741 L 24.5 4.68741 L 24.5 10.9992 C 26.3127 10.9992 29.0936 10.9054 30.7498 10.9054 L 30.7498 15.5928 Z M 4.78114 12.9684 L 4.78114 29.343 C 3.09401 29.5314 1.5934 29.7497 0 30 L 0 -5.68434e-14 L 4.46902 -5.68434e-14 L 10.5624 17.0316 L 10.5624 -5.68434e-14 L 15.2498 -5.68434e-14 L 15.2498 28.0617 C 13.5936 28.3438 11.9065 28.4375 10.1247 28.6868 L 4.78114 12.9684 Z" />
            </svg>
          </Link>
        </div>

        {/* ── RIGHT: links + logout ── */}
        <div className="nf-admin-right">

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nf-admin-navlink${isActive(link.to) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="nf-admin-sep" />

          <button className="nf-admin-logout" onClick={handleLogout}>
            <span className="nf-admin-logout-icon">🚪</span>
            Logout
          </button>

        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;