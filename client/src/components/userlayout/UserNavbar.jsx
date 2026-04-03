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
  font-family: 'Inter', sans-serif;
}

/* LEFT */
.nf-navbar-left {
  display: flex;
  align-items: center;
}

/* HAMBURGER */
.nf-menu-toggle {
  display: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

/* RIGHT */
.nf-navbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* LINKS */
.nf-navlink {
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  color: #999;
  transition: 0.2s;
}
.nf-navlink:hover {
  color: #fff;
  background: rgba(255,255,255,0.06);
}
.nf-navlink.active {
  color: #fff;
  font-weight: 700;
}

/* SEPARATOR */
.nf-nav-sep {
  width: 1px;
  height: 22px;
  background: rgba(255,255,255,0.1);
  margin: 0 10px;
}

/* AVATAR */
.nf-avatar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  cursor: pointer;
  background: transparent;
  border: none;
}
.nf-avatar-circle {
  width: 30px;
  height: 30px;
  background: #E50914;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.nf-avatar-name {
  color: #e5e5e5;
  font-size: 0.8rem;
}

/* DROPDOWN */
.nf-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  width: 200px;
  background: #1f1f1f;
  border-radius: 6px;
  overflow: hidden;
}
.nf-dropdown-item {
  padding: 10px;
  color: #ccc;
  text-decoration: none;
  display: block;
}
.nf-dropdown-item:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}

/* MOBILE */
@media (max-width: 900px) {
  .nf-navbar {
    padding: 0 16px;
  }

  .nf-menu-toggle {
    display: block;
  }

  .nf-navbar-right {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    background: #141414;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 16px;
    gap: 10px;
    display: none;
  }

  .nf-navbar-right.open {
    display: flex;
  }

  .nf-navlink {
    width: 100%;
  }

  .nf-nav-sep {
    display: none;
  }

  .nf-avatar-btn {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 500px) {
  .nf-avatar-name {
    display: none;
  }
}
`;

function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef();

  useEffect(() => {
    API.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => {});
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

  const handleLogout = async () => {
    try { await API.post("/auth/logout"); } catch {}
    navigate("/login");
  };

  const links = [
    { to: "/user/movies", label: "Movies" },
    { to: "/user/dashboard", label: "Dashboard" },
    { to: "/user/feedback", label: "Feedback" },
  ];

  const isActive = (path) => location.pathname === path;

  const initials =
    user?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2) || "U";

  return (
    <>
      <style>{NAV_STYLES}</style>

      <nav className="nf-navbar">
        <div className="nf-navbar-left">
          <Link to="/user/movies">
            <span style={{ color: "#E50914", fontWeight: "bold" }}>NETFLIX</span>
          </Link>
        </div>

        {/* HAMBURGER */}
        <div className="nf-menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </div>

        <div className={`nf-navbar-right ${open ? "open" : ""}`}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`nf-navlink ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="nf-nav-sep" />

          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              className="nf-avatar-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="nf-avatar-circle">{initials}</div>
              <span className="nf-avatar-name">{user?.name || "Account"}</span>
            </button>

            {dropdownOpen && (
              <div className="nf-dropdown">
                <Link
                  to="/user/profile"
                  className="nf-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
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