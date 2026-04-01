import React from "react";

export default function GuestFooter() {
  const links = [
    "FAQ", "Help Centre", "Account", "Media Centre",
    "Investor Relations", "Jobs", "Ways to Watch", "Terms of Use",
    "Privacy", "Cookie Preferences", "Corporate Information",
    "Contact Us", "Speed Test", "Legal Notices", "Only on Netflix"
  ];

  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(to top, #000 85%, #111);
          color: rgba(255,255,255,0.7);
          padding:70px;
          position: relative;
        }

        /* subtle glow line */
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #e50914,
            transparent
          );
          opacity: 0.6;
        }

        .footer-phone {
          font-size: 16px;
          margin-bottom: 30px;
          color: rgba(255,255,255,0.85);
        }

        .footer-phone a {
          color: #fff;
          font-weight: 500;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px 20px;
          margin-bottom: 40px;
        }

        .footer-links a {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          text-decoration: none;
          position: relative;
          transition: all 0.25s ease;
        }

        /* underline animation */
        .footer-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 0%;
          height: 1px;
          background: #e50914;
          transition: width 0.3s ease;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .footer-links a:hover::after {
          width: 100%;
        }

        /* language dropdown */
        .footer-lang {
          margin-bottom: 25px;
        }

        .footer-lang select {
          background: rgba(22,22,22,0.8);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          padding: 10px 18px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .footer-lang select:hover {
          border-color: #e50914;
        }

        .footer-country {
          font-size: 14px;
          margin-bottom: 15px;
          color: rgba(255,255,255,0.6);
        }

        .footer-recaptcha {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          max-width: 500px;
          line-height: 1.4;
        }

        /* responsive */
        @media (max-width: 600px) {
          .footer {
            padding: 50px 20px 30px;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <footer className="footer">
        {/* Phone */}
        <p className="footer-phone">
          Questions? Call{" "}
          <a href="tel:000-800-919-1743">000-800-919-1743</a>
        </p>

        {/* Links */}
        <div className="footer-links">
          {links.map((link, i) => (
            <a key={i} href="#">
              {link}
            </a>
          ))}
        </div>

        {/* Language */}
        <div className="footer-lang">
          <select>
            <option value="en-IN">English</option>
            <option value="hi-IN">हिन्दी</option>
          </select>
        </div>

        {/* Country */}
        <p className="footer-country">Netflix India</p>

        {/* Recaptcha */}
        <p className="footer-recaptcha">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </footer>
    </>
  );
}