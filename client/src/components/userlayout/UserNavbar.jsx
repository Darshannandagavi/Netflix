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

  .nf-navbar-left {
    display: flex;
    align-items: center;
  }

  .nf-navbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* hamburger */
  .nf-hamburger {
    display: none;
    font-size: 1.5rem;
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* links */
  .nf-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nf-navlink {
    position: relative;
    padding: 8px 14px;
    border-radius: 4px;
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    color: #999;
    transition: 0.15s;
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
  }

  .nf-nav-sep {
    width: 1px;
    height: 22px;
    background: rgba(255,255,255,0.1);
  }

  /* avatar */
  .nf-avatar-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
  }

  .nf-avatar-circle {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    background: #E50914;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    color: #fff;
    font-size: 0.7rem;
  }

  .nf-avatar-name {
    color: #e5e5e5;
    font-size: 0.8rem;
  }

  .nf-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    width: 220px;
    background: #1f1f1f;
    border-radius: 6px;
    overflow: hidden;
  }

  .nf-dropdown-item {
    padding: 10px 14px;
    display: block;
    color: #ccc;
    text-decoration: none;
    cursor: pointer;
  }

  .nf-dropdown-item:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
  }

  /* 🔥 MOBILE */
  @media (max-width: 768px) {
    .nf-navbar {
      padding: 0 16px;
    }

    .nf-hamburger {
      display: block;
    }

    .nf-links {
      position: absolute;
      top: 68px;
      left: 0;
      right: 0;
      background: #141414;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .nf-links.open {
      max-height: 300px;
    }

    .nf-navlink {
      width: 100%;
      padding: 12px;
    }

    .nf-nav-sep {
      display: none;
    }

    .nf-avatar-name {
      display: none;
    }

    .nf-dropdown {
      left: 10px;
      right: 10px;
      width: auto;
    }
  }
`;

function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    API.get("/auth/me")
      .then((r) => setUser(r.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {}
    navigate("/login");
  };

  const links = [
    { to: "/user/movies", label: "Movies" },
    { to: "/user/dashboard", label: "Dashboard" },
    { to: "/user/feedback", label: "Feedback" },
  ];

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <>
      <style>{NAV_STYLES}</style>

      <nav className="nf-navbar">
        {/* Logo */}
        <div className="nf-navbar-left">
          <Link to="/user/movies">
            <svg viewBox="0 0 111 30" width="100" fill="#e50914">
              <path d="M 105.062 14.2806 L 110.999 30 ... Z" />
            </svg>
          </Link>
        </div>

        <div className="nf-navbar-right">
          {/* hamburger */}
          <button
            className="nf-hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            ☰
          </button>

          {/* links */}
          <div className={`nf-links ${mobileMenuOpen ? "open" : ""}`}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nf-navlink ${
                  location.pathname === link.to ? "active" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nf-nav-sep" />

          {/* avatar */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              className="nf-avatar-btn"
              onClick={() => {
                setDropdownOpen((v) => !v);
                setMobileMenuOpen(false);
              }}
            >
              <div className="nf-avatar-circle">{initials}</div>
              <span className="nf-avatar-name">{user?.name}</span>
            </button>

            {dropdownOpen && (
              <div className="nf-dropdown">
                <Link to="/user/profile" className="nf-dropdown-item">
                  Profile
                </Link>
                <button
                  className="nf-dropdown-item"
                  onClick={handleLogout}
                >
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