
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function OverviewCards() {
  const { t } = useTranslation();

  const { selectedCustomer } = useContext(BankContext);

  // Use only the selected customer's information.
  const customerData = selectedCustomer;

  const account = customerData?.account || {};

  const savedCurrency = account.currency || "GBP";

  const currency = ["GBP", "USD", "EUR", "CAD", "AUD"].includes(savedCurrency)
    ? savedCurrency
    : "GBP";

  const transactions = customerData?.recentTransactions || [];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const income = transactions.reduce((total, transaction) => {
    const amount = Number(
      String(transaction.amount || "").replace(/[^0-9.-]/g, "")
    );

    return String(transaction.amount || "").trim().startsWith("+")
      ? total + Math.abs(amount)
      : total;
  }, 0);

  const expenses = transactions.reduce((total, transaction) => {
    const amount = Number(
      String(transaction.amount || "").replace(/[^0-9.-]/g, "")
    );

    return String(transaction.amount || "").trim().startsWith("-")
      ? total + Math.abs(amount)
      : total;
  }, 0);

  const cards = [
    {
      title: t("income"),
      value: formatAmount(income),
      color: "#16a34a",
    },
    {
      title: t("expenses"),
      value: formatAmount(expenses),
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
            background: "#123B65",
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
