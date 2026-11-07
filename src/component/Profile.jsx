import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Profile({ setPage }) {
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
          border: "none",
          background: "#005EB8",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        ← {t("back")}
      </button>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#005EB8",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
            fontWeight: "bold",
            margin: "auto",
          }}
        >
          {bank.customer.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <h2>{bank.customer.name}</h2>

        <p style={{ color: "#666" }}>
          {t("personalCurrentAccount")}
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "30px",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <p>
          <strong>{t("customerId")}:</strong> RB102874
        </p>

        <p>
          <strong>{t("accountNumber")}:</strong>{" "}
          {bank.customer.accountNumber}
        </p>

        <p>
          <strong>{t("sortCode")}:</strong>{" "}
          {bank.customer.sortCode}
        </p>

        <p>
          <strong>{t("currency")}:</strong>{" "}
          {bank.customer.currency}
        </p>

        <p>
          <strong>{t("status")}:</strong>{" "}
          {bank.customer.status}
        </p>
      </div>
    </div>
  );
}

export default Profile;