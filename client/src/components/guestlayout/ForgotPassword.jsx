import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../axiosConfig";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required."); return; }
    setError(""); setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      console.log("error",err)
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        .forgot-wrapper {
          min-height: 100vh;
          background: url("/Hero.jpg") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .forgot-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.75);
        }

        .forgot-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 420px;
          background: rgba(0,0,0,0.75);
          padding: 48px 40px;
          border-radius: 8px;
          color: #fff;
        }

        .forgot-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .forgot-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-group input {
          width: 100%;
          padding: 18px 14px 6px;
          background: #333;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          outline: none;
        }

        .input-group label {
          position: absolute;
          left: 14px;
          top: 14px;
          color: #aaa;
          font-size: 14px;
          transition: 0.2s;
          pointer-events: none;
        }

        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
          top: 6px;
          font-size: 11px;
          color: #bbb;
        }

        .forgot-btn {
          width: 100%;
          padding: 14px;
          background: #e50914;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }

        .forgot-btn:hover {
          background: #c11119;
        }

        .forgot-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #aaa;
        }

        .forgot-footer a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
        }

        .error-box {
          background: rgba(255,0,0,0.1);
          border: 1px solid rgba(255,0,0,0.4);
          color: #ff4d4d;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .success-box {
          text-align: center;
        }

        .success-box h2 {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }

        .success-box p {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .success-btn {
          display: inline-block;
          background: #e50914;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          color: #fff;
          font-weight: 600;
        }

        .success-btn:hover {
          background: #c11119;
        }
      `}</style>

      <div className="forgot-wrapper">
        <div className="forgot-overlay"></div>

        <div className="forgot-card">
          {submitted ? (
            <div className="success-box">
              <h2>Check your inbox</h2>
              <p>
                If <strong>{email}</strong> exists, we have sent a temporary password.
              </p>
              <Link to="/login" className="success-btn">
                Go to Login →
              </Link>
            </div>
          ) : (
            <>
              <h2 className="forgot-title">Forgot Password</h2>
              <p className="forgot-sub">
                Enter your email and we’ll send you a temporary password.
              </p>

              {error && <div className="error-box">⚠ {error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Email address</label>
                </div>

                <button type="submit" disabled={loading} className="forgot-btn">
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="forgot-footer">
                Remembered? <Link to="/login">Sign in</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;