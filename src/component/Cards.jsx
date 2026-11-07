import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Cards({ setPage }) {
  const { t } = useTranslation();
  const { bank } = useContext(BankContext);

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
        ← {t("back")}
      </button>

      <h2 style={{ color: "#00205B" }}>
        {t("bankCards")}
      </h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
          marginTop: "20px",
        }}
      >
        <h3>{bank.card.type}</h3>

        <p>
          <strong>{t("cardNumber")}:</strong> {bank.customer.accountNumber}
        </p>

        <p>
          <strong>{t("expiry")}:</strong> {bank.card.expiry}
        </p>

        <p>
          <strong>{t("status")}:</strong> {bank.card.status}
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fff8e1",
            borderRadius: "10px",
            color: "#8a6d3b",
          }}
        >
          {bank.card.status === "Active"
            ? "Your card is active and ready for use."
            : "This card is inactive because the account is dormant. Complete Security Code verification to restore card services."}
        </div>

        <button
          onClick={() => setPage("security")}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            background: "#005EB8",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {t("verifySecurityCode")}
        </button>
      </div>
    </div>
  );
}

export default Cards;