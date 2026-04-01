import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../axiosConfig";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      console.log(res)
      navigate(res.data.user.role === "admin" ? "/admin" : "/movies");
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Netflix Sans", sans-serif;
          background: #000;
        }

        .login-page {
          position: relative;
          min-height: 100vh;
          background: url("/Hero.jpg") center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* DARK OVERLAY */
        .login-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.75);
        }

        /* CARD */
        .login-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 380px;
          background: #000000;
          padding: 40px 40px;
          border-radius: 6px;
        }

        .login-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 28px;
        }

        /* INPUT */
        .input-group {
          margin-bottom: 16px;
        }

        .input {
          width: 100%;
          padding: 16px;
          border-radius: 4px;
          border: none;
          background: #333;
          color: #fff;
          font-size: 14px;
        }

        .input:focus {
          outline: none;
          background: #454545;
        }

        /* ERROR */
        .error {
          background: #e87c03;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        /* BUTTON */
        .login-btn {
          width: 100%;
          padding: 14px;
          background: #e50914;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
        }

        .login-btn:hover {
          background: #c11119;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* FOOTER TEXT */
        .login-footer {
          margin-top: 20px;
          font-size: 14px;
          color: #737373;
          text-align:center;
        }

        .login-footer a {
          color: #fff;
          text-decoration: none;
          margin-left: 5px;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .forgot {
          display: block;
          margin-top: 12px;
          font-size: 13px;
          color: #b3b3b3;
          text-align: center;
        }

        .forgot:hover {
          text-decoration: underline;
        }

        /* LOGO */
        .logo {
          position: absolute;
          top: 20px;
          left: 40px;
          z-index: 3;
          color: #e50914;
          font-size: 28px;
          font-weight: 900;
        }
      `}</style>

      <div className="login-page">
    

        {/* CARD */}
        <div className="login-card">
          <h1 className="login-title">Sign In</h1>

          {error && <div className="error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                name="email"
                type="email"
                placeholder="Email or phone number"
                value={form.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <Link to="/forgot-password" className="forgot">
            Forgot password?
          </Link>

          <div className="login-footer">
            New to Netflix?
            <Link to="/register">Sign up now</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;