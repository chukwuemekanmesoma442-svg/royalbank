
import React, { useContext } from "react";
import { BankContext } from "../context/BankContext";

function BankCard() {
  const { selectedCustomer } = useContext(BankContext);

  const customerData = selectedCustomer;

  const customer = customerData?.customer || {};
  const account = customerData?.account || {};
  const card = customerData?.card || {};

  if (!customerData) {
    return (
      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          color: "#777",
        }}
      >
        Card information is unavailable.
      </div>
    );
  }

  const accountNumber =
    account.accountNumber ||
    customer.accountNumber ||
    "•••• •••• •••• 0000";

  const displayNumber = accountNumber.includes("*")
    ? accountNumber.replace("****", "•••• •••• •••• ")
    : accountNumber;

  return (
    <div
      style={{
        marginTop: "20px",
        background: "linear-gradient(135deg, #001F5B, #005EB8)",
        borderRadius: "20px",
        padding: "20px",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Royal Bank</h3>
        <span style={{ fontSize: "20px" }}>💳</span>
      </div>

      <div
        style={{
          width: "50px",
          height: "36px",
          background: "#D4AF37",
          borderRadius: "6px",
          marginTop: "20px",
        }}
      />

      <h2
        style={{
          letterSpacing: "3px",
          marginTop: "20px",
          fontWeight: "500",
          fontSize: "20px",
        }}
      >
        {displayNumber}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          gap: "10px",
        }}
      >
        <div>
          <small style={{ opacity: 0.8 }}>CARD HOLDER</small>
          <p style={{ margin: "5px 0 0" }}>
            {customer.name || "Customer"}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <small style={{ opacity: 0.8 }}>EXPIRES</small>
          <p style={{ margin: "5px 0 0" }}>
            {card.expiry || "—"}
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          marginTop: "20px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        VISA
      </div>
    </div>
  );
}

export default BankCard;
