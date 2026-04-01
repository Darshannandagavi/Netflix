import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function GuestNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .nav {

  position: absolute;
  top: 0;
  background: transparent;
          width: 100%;
          z-index: 20;
          padding: 20px 4%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: opacity 0.2s;
        }

        .nav-links a:hover {
          opacity: 0.7;
        }

        .active-link {
          font-weight: 600;
        }

        .sign-btn {
          background: #e50914;
          color: #fff;
          padding: 6px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .sign-btn:hover {
          background: #c11119;
        }

        .hamburger {
          display: none;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 12px;
          background: rgba(0,0,0,0.9);
          padding: 16px;
          position: absolute;
          top: 70px;
          right: 20px;
          border-radius: 8px;
        }

        .mobile-menu.open {
          display: flex;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>

      <header className="nav">
        {/* Netflix SVG Logo */}
        <Link to="/">
          <svg
            viewBox="0 0 111 30"
            width="100"
            fill="#e50914"
          >
            <path d="M 105.062 14.2806 L 110.999 30 C 109.249 29.7497 107.5 29.4367 105.718 29.1555 L 102.374 20.4686 L 98.9371 28.4375 C 97.25 28.1563 95.5928 28.0617 93.9057 27.8433 L 99.9372 14.0932 L 94.4681 -5.68434e-14 L 99.5313 -5.68434e-14 L 102.593 7.87422 L 105.875 -5.68434e-14 L 110.999 -5.68434e-14 L 105.062 14.2806 Z M 90.4687 -5.68434e-14 L 85.875 -5.68434e-14 L 85.875 27.25 C 87.3746 27.3437 88.9371 27.4056 90.4687 27.593 L 90.4687 -5.68434e-14 Z M 81.9055 26.9369 C 77.7186 26.6557 73.5308 26.4064 69.2502 26.3117 L 69.2502 -5.68434e-14 L 73.9366 -5.68434e-14 L 73.9366 21.8746 C 76.6248 21.9374 79.312 22.1558 81.9055 22.2804 L 81.9055 26.9369 Z M 64.2497 10.6561 L 64.2497 15.3435 L 57.8442 15.3435 L 57.8442 25.9996 L 53.2187 25.9996 L 53.2187 -5.68434e-14 L 66.3436 -5.68434e-14 L 66.3436 4.68741 L 57.8442 4.68741 L 57.8442 10.6561 L 64.2497 10.6561 Z M 45.3435 4.68741 L 45.3435 26.2499 C 43.781 26.2499 42.1876 26.2499 40.6561 26.3117 L 40.6561 4.68741 L 35.8122 4.68741 L 35.8122 -5.68434e-14 L 50.2184 -5.68434e-14 L 50.2184 4.68741 L 45.3435 4.68741 Z M 30.7498 15.5928 C 28.6878 15.5928 26.2499 15.5928 24.5 15.6875 L 24.5 22.6563 C 27.25 22.4679 30 22.2495 32.781 22.1558 L 32.781 26.6557 L 19.8125 27.6877 L 19.8125 -5.68434e-14 L 32.781 -5.68434e-14 L 32.781 4.68741 L 24.5 4.68741 L 24.5 10.9992 C 26.3127 10.9992 29.0936 10.9054 30.7498 10.9054 L 30.7498 15.5928 Z M 4.78114 12.9684 L 4.78114 29.343 C 3.09401 29.5314 1.5934 29.7497 0 30 L 0 -5.68434e-14 L 4.46902 -5.68434e-14 L 10.5624 17.0316 L 10.5624 -5.68434e-14 L 15.2498 -5.68434e-14 L 15.2498 28.0617 C 13.5936 28.3438 11.9065 28.4375 10.1247 28.6868 L 4.78114 12.9684 Z"/>
          </svg>
        </Link>

        <div className="nav-right">
          {/* Desktop Links */}
          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={isActive(link.to) ? "active-link" : ""}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sign Up Button */}
          <Link to="/register" className="sign-btn">
            Get Started
          </Link>

          {/* Hamburger */}
          <div
            className="hamburger"
            onClick={() => setOpen(!open)}
          >
            ☰
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${open ? "open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="sign-btn"
          >
            Get Started
          </Link>
        </div>
      </header>
    </>
  );
}