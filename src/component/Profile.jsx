import React from "react";

function Profile({ setPage }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <button
        onClick={() => setPage("dashboard")}
        style={{
          border: "none",
          background: "#005EB8",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#005EB8",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
            fontWeight: "bold",
            margin: "auto",
          }}
        >
          KR
        </div>

        <h2>Kirsty Rehman</h2>

        <p style={{ color: "#666" }}>
          Personal Current Account
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "30px",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <p><strong>Customer ID:</strong> RB102874</p>
        <p><strong>Account Number:</strong> ****2874</p>
        <p><strong>Sort Code:</strong> 16-28-74</p>
        <p><strong>Currency:</strong> GBP (£)</p>
        <p><strong>Status:</strong> Dormant</p>
      </div>
    </div>
  );
}

export default Profile;