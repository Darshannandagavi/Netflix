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
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{ADMIN_NAV_STYLES}</style>

      <nav className="nf-admin-navbar">

        {/* ── LEFT: logo + wordmark + badge ── */}
        <Link to="/admin" className="nf-admin-left">
          <div className="nf-admin-logo-icon">AD</div>
          <span className="nf-admin-wordmark">
            NET<span>FLICK</span>
          </span>
          <span className="nf-admin-badge">Admin</span>
        </Link>

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