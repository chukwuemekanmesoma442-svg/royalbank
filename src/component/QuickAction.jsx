import React from "react";
import {
  FiSend,
  FiCreditCard,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";

function QuickAction({ setPage }) {
  const actions = [
  {
    icon: <FiSend size={22} />,
    title: "Transfer",
    page: "transfer",
  },
  {
    icon: <FiDollarSign size={22} />,
    title: "Payments",
    page: "transactions",
  },
  {
    icon: <FiCreditCard size={22} />,
    title: "Cards",
    page: "cards",
  },
  {
    icon: <FiShield size={22} />,
    title: "Security Code",
    page: "security",
  },
];

  return (
    <div style={{ marginTop: "25px" }}>
      <h3
        style={{
          color: "#00205B",
          marginBottom: "15px",
        }}
      >
        Quick Actions
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        {actions.map((item, index) => (
          <div
  key={index}
 onClick={() => {
  if (item.title === "Transfer") {
    setPage("transfer");
  }

  if (item.title === "Payments") {
    setPage("transactions");
  }

  if (item.title === "Cards") {
    setPage("cards");
  }

  if (item.title === "Security Code") {
    setPage("security");
  }
}}
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    cursor: "pointer",
    transition: ".2s",
  }}
>
            <div
              style={{
                color: "#005EB8",
                marginBottom: "12px",
              }}
            >
              {item.icon}
            </div>

            <p
              style={{
                margin: 0,
                fontWeight: "600",
                color: "#333",
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickAction;