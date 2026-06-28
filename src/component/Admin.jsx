function Admin() {
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
      <h1>🏦 Royal Bank Admin Panel</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={card}>
          <h2>👤 Customers</h2>
          <h1>8,241</h1>
        </div>

        <div style={card}>
          <h2>💷 Deposits</h2>
          <h1>£98.4M</h1>
        </div>

        <div style={card}>
          <h2>🟠 Dormant Accounts</h2>
          <h1>136</h1>
        </div>

        <div style={card}>
          <h2>💸 Pending Transfers</h2>
          <h1>42</h1>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "white",
  color: "#222",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
};

export default Admin;