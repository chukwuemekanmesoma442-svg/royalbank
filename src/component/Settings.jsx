function Settings({setPage}) {
  return (
    <div
      style={{
        background: "#071B36",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>⚙️ Settings</h1>
<button
  onClick={() => setPage("dashboard")}
  style={{
    marginTop: "20px",
    marginBottom: "20px",
    padding: "12px 25px",
    background: "#0B3D91",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  ⬅ Back to Dashboard
</button>
      <div
        style={{
          background: "white",
          color: "#222",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "30px",
          maxWidth: "700px",
        }}
      >
        <h2>Account Settings</h2>

        <hr />

        <p>🔒 Change Password</p>

        <p>🔔 Notification Preferences</p>

        <p>🌙 Dark Mode</p>

        <p>🌍 Language: English (UK)</p>

        <p>🛡️ Two-Factor Authentication</p>

        <p>📱 Trusted Devices</p>

        <p>🔐 Privacy & Security</p>

        <button
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "15px",
            background: "#0B3D91",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;