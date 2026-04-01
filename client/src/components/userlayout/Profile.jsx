import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [nameForm, setNameForm] = useState({ name: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [picMsg, setPicMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    API.get("/auth/me").then((r) => { setUser(r.data); setNameForm({ name: r.data.name }); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!nameForm.name.trim()) { setProfileMsg({ type: "error", text: "Name is required." }); return; }
    setSaving(true); setProfileMsg({ type: "", text: "" });
    try {
      const res = await API.put("/auth/profile", { name: nameForm.name, email: user.email });
      setUser(res.data.user);
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.response?.data?.message || "Failed to update." });
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) { setPasswordMsg({ type: "error", text: "All fields are required." }); return; }
    if (newPassword.length < 8) { setPasswordMsg({ type: "error", text: "Min 8 characters." }); return; }
    if (newPassword !== confirmPassword) { setPasswordMsg({ type: "error", text: "Passwords do not match." }); return; }
    setChangingPassword(true); setPasswordMsg({ type: "", text: "" });
    try {
      await API.put("/auth/change-password", { currentPassword, newPassword });
      setPasswordMsg({ type: "success", text: "Password changed successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.response?.data?.message || "Failed to change password." });
    } finally { setChangingPassword(false); }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setPicMsg({ type: "error", text: "JPG, PNG or WEBP only." }); return; }
    if (file.size > 5 * 1024 * 1024) { setPicMsg({ type: "error", text: "Max 5MB." }); return; }
    const formData = new FormData();
    formData.append("profilePic", file);
    setUploadingPic(true); setPicMsg({ type: "", text: "" });
    try {
      const res = await API.put("/auth/profile-pic", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setUser(res.data.user);
      setPicMsg({ type: "success", text: "Profile picture updated." });
    } catch (err) {
      setPicMsg({ type: "error", text: err.response?.data?.message || "Upload failed." });
    } finally { setUploadingPic(false); }
  };

  const msgStyle = (type) => ({
    padding: "12px 16px",
    borderRadius: "4px",
    marginBottom: "20px",
    fontSize: "14px",
    backgroundColor: type === "success" ? "rgba(0, 204, 0, 0.1)" : "rgba(229, 9, 20, 0.1)",
    borderLeft: `4px solid ${type === "success" ? "#00cc00" : "#e50914"}`,
    color: type === "success" ? "#00cc00" : "#e50914",
  });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#141414" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #333", borderTopColor: "#e50914", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #141414 0%, #0a0a0a 100%)",
      padding: "40px 24px 80px"
    }}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          * {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          }
        `}
      </style>
      
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Netflix-style header */}
        <div style={{ marginBottom: "48px", borderBottom: "1px solid #333", paddingBottom: "24px" }}>
          <h1 style={{ 
            fontSize: "32px", 
            fontWeight: "700", 
            color: "#e5e5e5",
            margin: 0,
            letterSpacing: "-0.5px"
          }}>
            Account
          </h1>
          <p style={{ 
            fontSize: "14px", 
            color: "#808080",
            marginTop: "8px",
            marginBottom: 0
          }}>
            Manage your profile and account settings
          </p>
        </div>

        {/* Profile Header - Netflix style */}
        <div style={{ 
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
          borderRadius: "8px",
          padding: "32px",
          marginBottom: "24px",
          border: "1px solid #2a2a2a"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              {user?.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  style={{ 
                    width: "100px", 
                    height: "100px", 
                    borderRadius: "8px", 
                    objectFit: "cover", 
                    border: "2px solid #e50914"
                  }} 
                />
              ) : (
                <div style={{ 
                  width: "100px", 
                  height: "100px", 
                  background: "linear-gradient(135deg, #e50914, #b00710)",
                  borderRadius: "8px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#fff", 
                  fontSize: "32px", 
                  fontWeight: "700",
                  border: "2px solid #e50914"
                }}>
                  {initials}
                </div>
              )}
              <label 
                htmlFor="picInput" 
                style={{ 
                  position: "absolute", 
                  bottom: "-8px", 
                  right: "-8px", 
                  width: "32px", 
                  height: "32px", 
                  backgroundColor: "#e50914", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: "2px solid #141414"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f6121d")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e50914")}
              >
                <svg style={{ width: "14px", height: "14px", color: "#fff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </label>
              <input id="picInput" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleProfilePicChange} style={{ display: "none" }} />
            </div>
            
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#e5e5e5", marginBottom: "8px" }}>
                {user?.name}
              </h2>
              <p style={{ fontSize: "14px", color: "#808080", marginBottom: "4px" }}>
                {user?.email}
              </p>
              <div style={{ 
                display: "inline-block",
                padding: "4px 12px", 
                background: "rgba(229, 9, 20, 0.15)", 
                color: "#e50914", 
                fontSize: "12px", 
                fontWeight: "600", 
                borderRadius: "4px", 
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                {user?.role}
              </div>
              {uploadingPic && <p style={{ fontSize: "12px", color: "#e50914", marginTop: "8px" }}>Uploading...</p>}
              {picMsg.text && <p style={{ fontSize: "12px", marginTop: "8px", color: picMsg.type === "success" ? "#00cc00" : "#e50914" }}>{picMsg.text}</p>}
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div style={{ 
          background: "#1a1a1a",
          borderRadius: "8px",
          padding: "32px",
          marginBottom: "24px",
          border: "1px solid #2a2a2a"
        }}>
          <h3 style={{ 
            fontSize: "20px", 
            fontWeight: "600", 
            color: "#e5e5e5", 
            marginBottom: "8px"
          }}>
            Personal Information
          </h3>
          <p style={{ fontSize: "13px", color: "#808080", marginBottom: "24px" }}>
            Update your personal details
          </p>
          
          {profileMsg.text && <div style={msgStyle(profileMsg.type)}>{profileMsg.type === "success" ? "✓" : "!"} {profileMsg.text}</div>}
          
          <form onSubmit={handleProfileSave}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ 
                display: "block", 
                fontSize: "13px", 
                fontWeight: "600", 
                color: "#b3b3b3", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Full Name
              </label>
              <input 
                value={nameForm.name} 
                onChange={(e) => setNameForm({ name: e.target.value })} 
                placeholder="Your full name"
                required 
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  backgroundColor: "#0a0a0a",
                  color: "#e5e5e5",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#e50914";
                  e.target.style.backgroundColor = "#111";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#333";
                  e.target.style.backgroundColor = "#0a0a0a";
                }}
              />
            </div>
            
            <div style={{ marginBottom: "24px" }}>
              <label style={{ 
                display: "block", 
                fontSize: "13px", 
                fontWeight: "600", 
                color: "#b3b3b3", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Email Address <span style={{ color: "#555", fontWeight: "400" }}>(cannot be changed)</span>
              </label>
              <input 
                value={user?.email} 
                disabled 
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  backgroundColor: "#0a0a0a",
                  color: "#666",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  cursor: "not-allowed"
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={saving}
              style={{
                padding: "10px 24px",
                borderRadius: "4px",
                border: "none",
                cursor: saving ? "default" : "pointer",
                backgroundColor: "#e50914",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
                opacity: saving ? 0.6 : 1,
                transition: "all 0.2s",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
              onMouseEnter={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = "#f6121d";
              }}
              onMouseLeave={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = "#e50914";
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div style={{ 
          background: "#1a1a1a",
          borderRadius: "8px",
          padding: "32px",
          border: "1px solid #2a2a2a"
        }}>
          <h3 style={{ 
            fontSize: "20px", 
            fontWeight: "600", 
            color: "#e5e5e5", 
            marginBottom: "8px"
          }}>
            Change Password
          </h3>
          <p style={{ fontSize: "13px", color: "#808080", marginBottom: "24px" }}>
            Must be at least 8 characters
          </p>
          
          {passwordMsg.text && <div style={msgStyle(passwordMsg.type)}>{passwordMsg.type === "success" ? "✓" : "!"} {passwordMsg.text}</div>}
          
          <form onSubmit={handlePasswordChange}>
            {[
              { field: "current", label: "Current Password", key: "currentPassword", type: "currentPassword" },
              { field: "new", label: "New Password", key: "newPassword", type: "newPassword" },
              { field: "confirm", label: "Confirm New Password", key: "confirmPassword", type: "confirmPassword" },
            ].map(({ field, label, key }) => (
              <div key={key} style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "13px", 
                  fontWeight: "600", 
                  color: "#b3b3b3", 
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  {label}
                </label>
                <div style={{ position: "relative" }}>
                  <input 
                    type={showPasswords[field] ? "text" : "password"} 
                    value={passwordForm[key]}
                    onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })} 
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "12px 80px 12px 16px",
                      borderRadius: "4px",
                      border: "1px solid #333",
                      backgroundColor: "#0a0a0a",
                      color: "#e5e5e5",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#e50914";
                      e.target.style.backgroundColor = "#111";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333";
                      e.target.style.backgroundColor = "#0a0a0a";
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPasswords((p) => ({ ...p, [field]: !p[field] }))}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#808080",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#e50914")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#808080")}
                  >
                    {showPasswords[field] ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            ))}
            
            <button 
              type="submit" 
              disabled={changingPassword}
              style={{
                padding: "10px 24px",
                borderRadius: "4px",
                border: "1px solid #e50914",
                cursor: changingPassword ? "default" : "pointer",
                backgroundColor: "transparent",
                color: "#e50914",
                fontWeight: "600",
                fontSize: "14px",
                opacity: changingPassword ? 0.6 : 1,
                transition: "all 0.2s",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
              onMouseEnter={(e) => {
                if (!changingPassword) {
                  e.currentTarget.style.backgroundColor = "#e50914";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!changingPassword) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#e50914";
                }
              }}
            >
              {changingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;