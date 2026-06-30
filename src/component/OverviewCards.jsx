import React from "react";

function OverviewCards() {
  const cards = [
    {
      title: "Income",
      value: "£1,600,900.00",
      color: "#16a34a",
    },
    {
      title: "Expenses",
      value: "£0.00",
      color: "#dc2626",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        marginTop: "25px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "18px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <small style={{ color: "#777" }}>
            {card.title}
          </small>

          <h3
            style={{
              marginTop: "10px",
              color: card.color,
            }}
          >
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default OverviewCards;