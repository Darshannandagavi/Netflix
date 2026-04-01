import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../axiosConfig";

const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .nf-navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 52px;
    background: #141414;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }

  /* ── LEFT — wordmark ── */
  .nf-navbar-left {
    display: flex;
    align-items: center;
  }
  .nf-wordmark {
    font-size: 1.75rem;
    font-weight: 800;
    font-style: italic;
    letter-spacing: -1px;
    color: #E50914;
    text-decoration: none;
    line-height: 1;
    text-shadow: 0 0 28px rgba(229,9,20,0.35);
    user-select: none;
  }

  /* ── RIGHT — links + avatar ── */
  .nf-navbar-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* nav links */
  .nf-navlink {
    position: relative;
    padding: 8px 14px;
    border-radius: 4px;
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    color: #999;
    letter-spacing: 0.1px;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  .nf-navlink:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }
  .nf-navlink.active {
    color: #fff;
    font-weight: 700;
  }
  .nf-navlink.active::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 50%;
    transform: translateX(-50%);
    width: 18px; height: 2px;
    background: #E50914;
    border-radius: 1px;
  }

  /* divider between links and avatar */
  .nf-nav-sep {
    width: 1px; height: 22px;
    background: rgba(255,255,255,0.1);
    margin: 0 10px;
    flex-shrink: 0;
  }

  /* ── AVATAR BUTTON ── */
  .nf-avatar-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px 5px 6px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .nf-avatar-btn:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
  }
  .nf-avatar-circle {
    width: 30px; height: 30px;
    border-radius: 4px;
    background: #E50914;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.68rem; font-weight: 800;
    color: #fff; letter-spacing: 0.5px;
    flex-shrink: 0;
    text-transform: uppercase;
  }
  .nf-avatar-name {
    font-size: 0.82rem;
    font-weight: 500;
    color: #e5e5e5;
    max-width: 110px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .nf-avatar-caret {
    width: 14px; height: 14px;
    color: #666;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .nf-avatar-caret.open { transform: rotate(180deg); }

  /* ── DROPDOWN ── */
  .nf-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    width: 230px;
    background: #1f1f1f;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.7);
    overflow: hidden;
    animation: dropIn 0.18s ease both;
  }
  @keyframes dropIn {
    from { opacity:0; transform:translateY(-6px) scale(0.98); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  .nf-dropdown-header {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .nf-dropdown-header-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .nf-dropdown-header-email {
    font-size: 0.72rem;
    color: #555;
    margin: 3px 0 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .nf-dropdown-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 16px;
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    border: none; background: none; width: 100%;
    text-align: left; cursor: pointer;
    font-family: inherit;
    color: #ccc;
    transition: background 0.12s, color 0.12s;
  }
  .nf-dropdown-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
  .nf-dropdown-item.danger { color: #E50914; }
  .nf-dropdown-item.danger:hover { background: rgba(229,9,20,0.1); color: #ff3b3b; }
  .nf-dropdown-item-icon { font-size: 0.9rem; flex-shrink: 0; }
`;

function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => { API.get("/auth/me").then((r) => setUser(r.data)).catch(() => {}); }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try { await API.post("/auth/logout"); } catch {}
    navigate("/login");
  };

  const links = [
    { to: "/user/movies",    label: "Movies"    },
    { to: "/user/dashboard", label: "Dashboard" },
    { to: "/user/feedback",  label: "Feedback"  },
  ];

  const isActive = (path) => location.pathname === path;
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <>
      <style>{NAV_STYLES}</style>

      <nav className="nf-navbar">

        {/* ── LEFT: Netflix wordmark ── */}
        <div className="nf-navbar-left">
          <Link to="/movies" className="logo">
        <svg viewBox="0 0 111 30" width="100" fill="#e50914">
          <path d="M 105.062 14.2806 L 110.999 30 C 109.249 29.7497 107.5 29.4367 105.718 29.1555 L 102.374 20.4686 L 98.9371 28.4375 C 97.25 28.1563 95.5928 28.0617 93.9057 27.8433 L 99.9372 14.0932 L 94.4681 -5.68434e-14 L 99.5313 -5.68434e-14 L 102.593 7.87422 L 105.875 -5.68434e-14 L 110.999 -5.68434e-14 L 105.062 14.2806 Z M 90.4687 -5.68434e-14 L 85.875 -5.68434e-14 L 85.875 27.25 C 87.3746 27.3437 88.9371 27.4056 90.4687 27.593 L 90.4687 -5.68434e-14 Z M 81.9055 26.9369 C 77.7186 26.6557 73.5308 26.4064 69.2502 26.3117 L 69.2502 -5.68434e-14 L 73.9366 -5.68434e-14 L 73.9366 21.8746 C 76.6248 21.9374 79.312 22.1558 81.9055 22.2804 L 81.9055 26.9369 Z M 64.2497 10.6561 L 64.2497 15.3435 L 57.8442 15.3435 L 57.8442 25.9996 L 53.2187 25.9996 L 53.2187 -5.68434e-14 L 66.3436 -5.68434e-14 L 66.3436 4.68741 L 57.8442 4.68741 L 57.8442 10.6561 L 64.2497 10.6561 Z M 45.3435 4.68741 L 45.3435 26.2499 C 43.781 26.2499 42.1876 26.2499 40.6561 26.3117 L 40.6561 4.68741 L 35.8122 4.68741 L 35.8122 -5.68434e-14 L 50.2184 -5.68434e-14 L 50.2184 4.68741 L 45.3435 4.68741 Z M 30.7498 15.5928 C 28.6878 15.5928 26.2499 15.5928 24.5 15.6875 L 24.5 22.6563 C 27.25 22.4679 30 22.2495 32.781 22.1558 L 32.781 26.6557 L 19.8125 27.6877 L 19.8125 -5.68434e-14 L 32.781 -5.68434e-14 L 32.781 4.68741 L 24.5 4.68741 L 24.5 10.9992 C 26.3127 10.9992 29.0936 10.9054 30.7498 10.9054 L 30.7498 15.5928 Z M 4.78114 12.9684 L 4.78114 29.343 C 3.09401 29.5314 1.5934 29.7497 0 30 L 0 -5.68434e-14 L 4.46902 -5.68434e-14 L 10.5624 17.0316 L 10.5624 -5.68434e-14 L 15.2498 -5.68434e-14 L 15.2498 28.0617 C 13.5936 28.3438 11.9065 28.4375 10.1247 28.6868 L 4.78114 12.9684 Z"/>
        </svg>
      </Link>
        </div>

        {/* ── RIGHT: nav links + avatar ── */}
        <div className="nf-navbar-right">

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nf-navlink${isActive(link.to) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="nf-nav-sep" />

          {/* Avatar dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              className="nf-avatar-btn"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <div className="nf-avatar-circle">{initials}</div>
              <span className="nf-avatar-name">{user?.name || "Account"}</span>
              <svg
                className={`nf-avatar-caret${dropdownOpen ? " open" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="nf-dropdown">
                {/* User info */}
                <div className="nf-dropdown-header">
                  <p className="nf-dropdown-header-name">{user?.name}</p>
                  <p className="nf-dropdown-header-email">{user?.email}</p>
                </div>

                {/* Profile */}
                <Link
                  to="/user/profile"
                  className="nf-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="nf-dropdown-item-icon">👤</span>
                  Profile
                </Link>

                {/* Logout */}
                <button
                  className="nf-dropdown-item danger"
                  onClick={handleLogout}
                >
                  <span className="nf-dropdown-item-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </nav>
    </>
  );
}

export default UserNavbar;