import React, { useState } from "react";

function Transfer({ setPage }) {
  const [amount, setAmount] = useState("");

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

      <h2 style={{ color: "#00205B" }}>Bank Transfer</h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
        }}
      >
        <input placeholder="Recipient Name" style={inputStyle} />

        <input placeholder="Bank Name" style={inputStyle} />

        <input placeholder="Account Number" style={inputStyle} />

        <input placeholder="Sort Code" style={inputStyle} />

        <input
          placeholder="Amount (£)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Payment Reference"
          style={{
            ...inputStyle,
            height: "90px",
          }}
        />

        <div
          style={{
            background: "#eef5ff",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <p><strong>Available Balance:</strong> £1,600,900.00</p>
          <p><strong>Transfer Fee:</strong> £0.00</p>
          <p><strong>Account Status:</strong> Dormant</p>
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
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Continue Transfer
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default Transfer;