import React from "react";

function Transfer({ setPage }) {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2>Bank Transfer</h2>

      <input
        type="text"
        placeholder="Recipient Name"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="text"
        placeholder="Account Number"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="text"
        placeholder="Bank Name"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="number"
        placeholder="Amount"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Narration (Optional)"
        style={{
          width: "100%",
          padding: "12px",
          height: "100px",
          marginBottom: "20px",
        }}
      />

      <button
  onClick={() => {
    alert("Transfer Pending");
    setPage("dashboard");
  }}
  style={{
    width: "100%",
    padding: "15px",
    background: "#0B3D91",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  }}
>
  Submit Transfer
</button>
    </div>
  );
}

export default Transfer;