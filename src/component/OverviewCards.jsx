
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function OverviewCards() {
  const { t } = useTranslation();
  const { bank } = useContext(BankContext);

  const savedCurrency = bank?.customer?.currency || "GBP";

const currency = ["GBP", "USD", "EUR", "CAD", "AUD"].includes(savedCurrency)
  ? savedCurrency
  : "GBP";;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const cards = [
    {
      title: t("income"),
      value: formatAmount(1600900),
      color: "#16a34a",
    },
    {
      title: t("expenses"),
      value: formatAmount(0),
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
