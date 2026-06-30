import React from "react";

function Cards({ setPage }) {
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
          background: "#005EB8",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00205B" }}>Bank Cards</h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
          marginTop: "20px",
        }}
      >
        <h3>Royal Bank Platinum Debit Card</h3>

        <p><strong>Card Number:</strong> **** **** **** 2874</p>
        <p><strong>Expiry:</strong> 12/11</p>
        <p><strong>Status:</strong> Dormant</p>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fff8e1",
            borderRadius: "10px",
            color: "#8a6d3b",
          }}
        >
          This card is inactive because the account is dormant. Complete Security Code verification to restore card services.
        </div>

        <button
          onClick={() => setPage("security")}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            background: "#005EB8",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Verify Security Code
        </button>
      </div>
    </div>
  );
}

export default Cards;