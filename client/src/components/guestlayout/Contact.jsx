import React from "react";

export default function Contact() {
  return (
    <>
      <style>{`
        .contact-page {
          background: radial-gradient(circle at top, #1a1a1a, #000);
          color: #fff;
          min-height: 100vh;
          font-family: "Netflix Sans", sans-serif;
          overflow-x: hidden;
        }

        /* HERO */
        .contact-hero {
          position: relative;
          padding: 120px 6% 80px;
          text-align: center;
        }

        .contact-title {
          font-size: 3.2rem;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .contact-subtitle {
          margin-top: 10px;
          color: rgba(255,255,255,0.6);
          font-size: 1.1rem;
        }

        /* MAIN LAYOUT */
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 0 6% 80px;
        }

        /* LEFT SIDE */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .support-card {
          background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
          border-radius: 12px;
          padding: 20px;
          transition: 0.3s;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .support-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(229,9,20,0.2);
        }

        .support-card h3 {
          margin-bottom: 6px;
        }

        .support-card p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
        }

        /* RIGHT SIDE FORM */
        .contact-card {
          background: rgba(20,20,20,0.7);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.9);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .form-group {
          position: relative;
          margin-bottom: 24px;
        }

        .form-input {
          width: 100%;
          padding: 18px 14px 8px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: all 0.25s ease;
        }

        /* 🔴 Netflix Glow Focus */
        .form-input:focus {
          border-color: #e50914;
          box-shadow: 0 0 0 2px rgba(229,9,20,0.3),
                      0 0 20px rgba(229,9,20,0.4);
        }

        .form-label {
          position: absolute;
          top: 14px;
          left: 14px;
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
          pointer-events: none;
          transition: 0.2s;
        }

        .form-input:focus + .form-label,
        .form-input:not(:placeholder-shown) + .form-label {
          top: 5px;
          font-size: 0.75rem;
          color: #e50914;
        }

        textarea.form-input {
          height: 120px;
          resize: none;
        }

        /* BUTTON */
        .contact-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #e50914, #b20710);
          border: none;
          border-radius: 6px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
        }

        .contact-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 25px rgba(229,9,20,0.6);
        }

        /* FOOT INFO */
        .contact-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="contact-page">
        {/* HERO */}
        <div className="contact-hero">
          <h1 className="contact-title">Need Help?</h1>
          <p className="contact-subtitle">
            Our support team is available 24/7
          </p>
        </div>

        {/* MAIN */}
        <div className="contact-wrapper">
          {/* LEFT */}
          <div className="contact-left">
            <div className="support-card">
              <h3>Account Issues</h3>
              <p>Login problems, billing errors, subscription help.</p>
            </div>

            <div className="support-card">
              <h3>Streaming Problems</h3>
              <p>Playback issues, buffering, quality settings.</p>
            </div>

            <div className="support-card">
              <h3>General Questions</h3>
              <p>Anything else? We’re here to help.</p>
            </div>

            <div className="support-card">
              <h3>📞 Call Us</h3>
              <p>000-800-919-1743</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-card">
            <form>
              <div className="form-group">
                <input type="text" className="form-input" placeholder=" " required />
                <label className="form-label">Full Name</label>
              </div>

              <div className="form-group">
                <input type="email" className="form-input" placeholder=" " required />
                <label className="form-label">Email</label>
              </div>

              <div className="form-group">
                <textarea className="form-input" placeholder=" " required></textarea>
                <label className="form-label">Message</label>
              </div>

              <button className="contact-btn">Send Message</button>
            </form>

            <div className="contact-footer">
              We usually respond within a few hours
            </div>
          </div>
        </div>
      </div>
    </>
  );
}