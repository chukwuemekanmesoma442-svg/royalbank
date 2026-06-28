function Profile({setPage}) {
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
      <h1>👤 Customer Profile</h1>
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
          maxWidth: "700px",
          marginTop: "30px",
        }}
      >
        <h2>Kristy Rehman</h2>

        <hr />

        <p><strong>Customer ID:</strong> RB-2026-004582</p>

        <p><strong>Account Number:</strong> ****4582</p>

        <p><strong>Sort Code:</strong> 20-45-67</p>

        <p><strong>IBAN:</strong> GB29 RBKL 2045 6745 8200 18</p>

        <p><strong>Account Type:</strong> Premium Current Account</p>

        <p><strong>Current Balance:</strong> £1,600,900.00</p>

        <p><strong>Status:</strong> 🟠 Dormant</p>

        <p><strong>Email:</strong> kristy.rehman@royalbank.co.uk</p>

        <p><strong>Phone:</strong> +44 7700 900123</p>

        <p><strong>Address:</strong> 25 Kensington High Street, London, W8 5NP</p>
      </div>
    </div>
  );
}

export default Profile;