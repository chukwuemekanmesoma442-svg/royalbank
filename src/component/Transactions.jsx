
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Transactions({ setPage }) {
  const { t } = useTranslation();

  const {
    bank,
    selectedCustomer,
    transfers,
    loadingTransfers,
  } = useContext(BankContext);

  const customer = selectedCustomer || bank;
  const account = customer?.account || {};

  const customerTransactions = [...(transfers || [])].sort(
    (a, b) => {
      const dateA = a.createdAt?.toDate
        ? a.createdAt.toDate().getTime()
        : 0;
      const dateB = b.createdAt?.toDate
        ? b.createdAt.toDate().getTime()
        : 0;

      return dateB - dateA;
    }
  );

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Date unavailable";

    return timestamp.toDate().toLocaleString();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "#f5f7fb",
        padding: "20px",
        paddingBottom: "80px",
        overflowY: "auto",
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
        }}
      >
        ← {t("back")}
      </button>

      <h2 style={{ color: "#00205B", marginTop: "20px" }}>
        {t("transactionHistory")}
      </h2>

      <div
        style={{
          background: "#fff",
          padding: "18px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
        }}
      >
        <p>
          <strong>{t("accountHolder")}:</strong>{" "}
          {customer?.customer?.name || "No customer selected"}
        </p>

        <p>
          <strong>{t("account")}:</strong>{" "}
          {account.accountNumber || "Not assigned"}
        </p>

        <p>
          <strong>{t("status")}:</strong>{" "}
          {account.status || "Not assigned"}
        </p>

        <p>
          <strong>{t("availableBalance")}:</strong>{" "}
          {account.currency || "GBP"}{" "}
          {Number(account.balance || 0).toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <h2
        style={{
          color: "#00205B",
          marginTop: "30px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {t("fullTransactionHistory")}
      </h2>

      {loadingTransfers ? (
        <p style={{ textAlign: "center" }}>Loading transactions...</p>
      ) : customerTransactions.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "30px 20px",
            borderRadius: "15px",
            textAlign: "center",
            color: "#666",
          }}
        >
          <h3>No transactions yet</h3>
          <p>Your demo transaction history will appear here.</p>
        </div>
      ) : (
        customerTransactions.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "18px",
              marginBottom: "15px",
              boxShadow: "0 3px 12px rgba(0,0,0,.06)",
            }}
          >
            <small style={{ color: "#666" }}>
              {formatDate(item.createdAt)}
            </small>

            <h4 style={{ margin: "8px 0" }}>
              {item.recipientName || "Demo transfer"}
            </h4>

            <p style={{ margin: "5px 0", color: "#555" }}>
              {item.bankName}
            </p>

            <div
              style={{
                color: "#dc2626",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              -{item.amount} 
            </div>

            <small
              style={{
                display: "block",
                marginTop: "10px",
                color: "#666",
              }}
            >
              Status: {item.status || "Pending"} · Demo
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Transactions;
