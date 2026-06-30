import React, { useState } from "react";

function SecurityCode({ setPage }) {
  const [code, setCode] = useState("");

  const verifyCode = () => {
    if (code === "472916") {
  alert("Verifying your identity... Please wait.");

  setTimeout(() => {
    setPage("dashboard");
  }, 5000);
} else {
  alert("Invalid Security Code");
}
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "80px auto",
        padding: "30px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#082B6B" }}>
        Security Verification
      </h2>

      <p>
        Please enter your 6-digit Security Code.
      </p>

      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
        placeholder="••••••"
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "22px",
          textAlign: "center",
          letterSpacing: "8px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      />

      <button
        onClick={verifyCode}
        style={{
          marginTop: "25px",
          width: "100%",
          padding: "15px",
          background: "#082B6B",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Verify
      </button>
    </div>
  );
}

export default SecurityCode;