
import React, { useContext } from "react";
import { BankContext } from "../context/BankContext";

function RecentTransactions({ onSelectTransfer }) {
  const { bank, transfers, loadingTransfers } = useContext(BankContext);

  const allowedCurrencies = ["GBP", "USD", "EUR", "CAD", "AUD"];

  const savedCurrency = bank?.customer?.currency || "GBP";

  const currency = allowedCurrencies.includes(savedCurrency)
    ? savedCurrency
    : "GBP";

  const formatAmount = (amount) => {
    const numericAmount = Number(
      String(amount ?? "0")
        .replace(/,/g, "")
        .replace(/[^0-9.-]/g, "")
    );

    if (!Number.isFinite(numericAmount)) {
      return String(amount ?? "");
    }

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  };

  const formatDate = (value) => {
    if (!value) return "Processing date";

    const date = value?.toDate
      ? value.toDate()
      : new Date(value);

    if (isNaN(date.getTime())) return "Processing date";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const recentTransfers = [...transfers]
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate
        ? a.createdAt.toDate().getTime()
        : new Date(a.createdAt || 0).getTime();

      const dateB = b.createdAt?.toDate
        ? b.createdAt.toDate().getTime()
        : new Date(b.createdAt || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        marginTop: "22px",
        boxShadow: "0 3px 15px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ color: "#082B6B", marginTop: 0 }}>
        Recent Transactions
      </h3>

      {loadingTransfers ? (
        <p style={{ color: "#777" }}>
          Loading transactions...
        </p>
      ) : recentTransfers.length === 0 ? (
        <p style={{ color: "#777" }}>
          No transactions available yet.
        </p>
      ) : (
        recentTransfers.map((transfer) => (
          <div
            key={transfer.id}
            onClick={() => onSelectTransfer?.(transfer)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              padding: "15px 0",
              borderBottom: "1px solid #edf0f4",
              cursor: "pointer",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <strong
                style={{
                  display: "block",
                  color: "#082B6B",
                  fontSize: "14px",
                  overflowWrap: "anywhere",
                }}
              >
                {transfer.recipientName}
              </strong>

              <span style={{ color: "#888", fontSize: "12px" }}>
                {transfer.bankName} • {formatDate(transfer.createdAt)}
              </span>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <strong style={{ color: "#082B6B", fontSize: "14px" }}>
                {formatAmount(transfer.amount)}
              </strong>

              <span
                style={{
                  display: "block",
                  color:
                    transfer.status === "successful"
                      ? "#15803d"
                      : transfer.status === "failed"
                      ? "#dc2626"
                      : "#ea910c",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  textTransform: "uppercase",
                }}
              >
                {transfer.status || "Pending"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentTransactions;
