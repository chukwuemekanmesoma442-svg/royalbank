function Notifications() {
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
      <h1>🔔 Notifications</h1>

      <div
        style={{
          background: "white",
          color: "#222",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "30px",
          maxWidth: "800px",
        }}
      >
        <h3>Recent Notifications</h3>

        <hr />

        <p>🔒 Security Alert — Login successful from London, United Kingdom.</p>

        <p>🟠 Your account has been marked as Dormant.</p>

        <p>💷 Interest payment credited successfully.</p>

        <p>📜 Your latest account statement is available.</p>

        <p>🔐 We recommend updating your password regularly.</p>

        <p>🏦 Thank you for banking with Royal Bank.</p>
      </div>
    </div>
  );
}

export default Notifications;