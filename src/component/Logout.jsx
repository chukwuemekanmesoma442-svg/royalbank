function Logout() {
  return (
    <div
      style={{
        background: "#071B36",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          color: "#222",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          width: "400px",
        }}
      >
        <h1>👋 Logged Out</h1>

        <p>
          Thank you for banking with Royal Bank.
        </p>

        <p>
          Your session has ended successfully.
        </p>
      </div>
    </div>
  );
}

export default Logout;