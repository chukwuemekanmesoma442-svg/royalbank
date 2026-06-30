import React from "react";

function CustomerSupport({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f5f7fb" }}>
      <button onClick={() => setPage("dashboard")}>
        Back
      </button>

      <h2>Customer Support</h2>

      <p>Royal Bank Help Centre</p>

      <button onClick={() => setPage("security")}>
        Verify Security Code
      </button>
    </div>
  );
}

export default CustomerSupport;