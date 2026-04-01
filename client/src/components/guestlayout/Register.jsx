
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../axiosConfig";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) { setError("All fields are required."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError(""); setLoading(true);
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally { setLoading(false); }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <>
  <style>{`
    body {
      margin: 0;
      font-family: "Netflix Sans", sans-serif;
      background: #000;
    }

    .register-page {
      position: relative;
      min-height: 100vh;
      background: url("/Hero.jpg") center/cover no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .register-page::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.75);
    }

    /* LOGO */
    .logo {
      position: absolute;
      top: 20px;
      left: 40px;
      z-index: 3;
      color: #e50914;
      font-size: 30px;
      font-weight: 900;
      letter-spacing: 1px;
    }

    /* CARD */
    .register-card {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 420px;
      background: rgba(0,0,0,0.85);
      padding: 60px 48px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
    }

    .register-title {
      font-size: 34px;
      font-weight: 800;
      margin-bottom: 28px;
    }

    /* INPUT */
    .input-group {
      margin-bottom: 16px;
    }

    .input {
      width: 100%;
      padding: 18px 16px;
      border-radius: 4px;
      border: none;
      background: #333;
      color: #fff;
      font-size: 15px;
      outline: none;
      transition: 0.2s;
    }

    .input:focus {
      background: #454545;
    }

    /* ERROR */
    .error {
      background: #e87c03;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 18px;
      font-size: 14px;
    }

    /* BUTTON */
    .register-btn {
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
      transition: 0.2s;
    }

    .register-btn:hover {
      background: #f6121d;
    }

    .register-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* FOOTER */
    .register-footer {
      margin-top: 40px;
      font-size: 15px;
      color: #737373;
    }

    .register-footer a {
      color: #fff;
      text-decoration: none;
      margin-left: 5px;
      font-weight: 500;
    }

    .register-footer a:hover {
      text-decoration: underline;
    }

    /* EXTRA TEXT */
    .terms-text {
      margin-top: 14px;
      font-size: 12px;
      color: #8c8c8c;
      line-height: 1.5;
    }

    .terms-text a {
      color: #0071eb;
      text-decoration: none;
    }

    .terms-text a:hover {
      text-decoration: underline;
    }
  `}</style>

  <div className="register-page">


    <div className="register-card">
      <h1 className="register-title">Sign Up</h1>

      {error && <div className="error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <input
            name="email"
            type="email"
            placeholder="Email address"
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
            placeholder="Password (min 8 characters)"
            value={form.password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {/* FOOTER */}
      <div className="register-footer">
        Already have an account?
        <Link to="/login">Sign in now</Link>
      </div>

     
    </div>
  </div>
</>
  );
}

export default Register;
