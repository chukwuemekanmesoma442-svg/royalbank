import React from "react";

function AccountSummary() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "20px",
        marginTop: "25px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        Account Summary
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "18px",
        }}
      >
        <div>
          <small style={{ color: "#777" }}>
            Sort Code
          </small>

          <h4 style={{ margin: "6px 0" }}>
            16-28-74
          </h4>
        </div>

        <div>
          <small style={{ color: "#777" }}>
            Currency
          </small>

          <h4 style={{ margin: "6px 0" }}>
            GBP (£)
          </h4>
        </div>
      </div>

      <hr style={{ margin: "18px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <small style={{ color: "#777" }}>
            IBAN
          </small>

          <div
            style={{
              fontWeight: "600",
              marginTop: "5px",
            }}
          >
            GB29 RBOS 6016 ****2874
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;