import React from "react";

function CustomerSupport({ setPage }) {
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

      <h2 style={{ color: "#00205B" }}>
        Customer Support
      </h2>

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          marginTop: "20px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
        }}
      >
        <h3>Royal Bank Help Centre</h3>

        <p><strong>Phone:</strong> +44 345 600 2230</p>

        <p><strong>Email:</strong> theroyalbank1@gmail.com</p>

        <p><strong>Office Hours:</strong></p>

        <p>Monday – Friday</p>

        <p>8:00 AM – 6:00 PM</p>

        <hr />

        <h4>Dormant Account Assistance</h4>

        <p>
          Your account has been inactive since
          <strong> 18 December 2011</strong>.
        </p>

        <p>
  To restore full banking services, please complete your Security Code verification.
  If you require further assistance, contact our support team at
  <strong> theroyalbank1@gmail.com</strong>.
</p>

        <button
          onClick={() => setPage("security")}
          style={{
            background: "#005EB8",
            color: "#fff",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          Verify Security Code
        </button>
      </div>
    </div>
  );
}

export default CustomerSupport;