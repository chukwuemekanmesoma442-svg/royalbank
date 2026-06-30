import React from "react";

function BalanceCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00205B, #005EB8)",
        borderRadius: "20px",
        padding: "20px",
        color: "#fff",
        marginTop: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <p
        style={{
          margin: 0,
          opacity: 0.8,
          fontSize: "14px",
        }}
      >
        Available Balance
      </p>

      <h1
        style={{
          margin: "12px 0",
          fontSize: "32px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        £1,600,900.00
      </h1>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          margin: "18px 0",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              opacity: 0.7,
              fontSize: "12px",
            }}
          >
            Account
          </p>

          <h4 style={{ margin: "5px 0" }}>
            Current Account
          </h4>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              margin: 0,
              opacity: 0.7,
              fontSize: "12px",
            }}
          >
            Number
          </p>

          <h4 style={{ margin: "5px 0" }}>
            •••• 2874
          </h4>
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "inline-block",
          background: "#FFD54F",
          color: "#000",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        Dormant Account
      </div>
    </div>
  );
}

export default BalanceCard;