
import React, { useContext, useState } from "react";
import { BankContext } from "../context/BankContext";
import { db } from "../firebase";

import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Available app currencies
const currencyOptions = [
  { code: "GBP", label: "British Pound (£)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "CAD", label: "Canadian Dollar (C$)" },
  { code: "AUD", label: "Australian Dollar (A$)" },
];

function Admin({ setPage }) {
  const {
    bank,
    setBank,
    transfers = [],
    loadingTransfers,
  } = useContext(BankContext);

  const [name, setName] = useState(bank.customer.name);
  const [accountNumber, setAccountNumber] = useState(
    bank.customer.accountNumber
  );
  const [sortCode, setSortCode] = useState(
    bank.customer.sortCode
  );

  const [currency, setCurrency] = useState(
    currencyOptions.some(
      (item) => item.code === bank.customer.currency
    )
      ? bank.customer.currency
      : "GBP"
  );

  const [balance, setBalance] = useState(bank.account.balance);
  const [status, setStatus] = useState(bank.customer.status);

  const [cardType, setCardType] = useState(bank.card.type);
  const [cardExpiry, setCardExpiry] = useState(bank.card.expiry);
  const [cardStatus, setCardStatus] = useState(bank.card.status);

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationPriority, setNotificationPriority] =
    useState("Normal");

  const [securityCode, setSecurityCode] = useState(
    bank.security?.code || ""
  );

  const [updatingTransfer, setUpdatingTransfer] = useState(null);

  // Save bank information to Firebase.
  const saveToFirebase = async (newBank) => {
    try {
      const { login, ...safeBank } = newBank;

      await setDoc(doc(db, "bank", "royalbank"), safeBank);

      setBank(newBank);
      alert("Saved successfully!");
    } catch (error) {
      console.error("Firestore Save Error:", error);
      alert("Failed to save: " + error.message);
    }
  };

  // Change transfer status.
  const changeTransferStatus = async (transferId, newStatus) => {
    try {
      setUpdatingTransfer(transferId);

      await updateDoc(
        doc(db, "bank", "royalbank", "transfers", transferId),
        { status: newStatus }
      );

      alert(`Transfer status updated to ${newStatus}.`);
    } catch (error) {
      console.error("Transfer Update Error:", error);
      alert("Could not update transfer: " + error.message);
    } finally {
      setUpdatingTransfer(null);
    }
  };

  // Delete a demo transfer receipt.
  const deleteTransfer = async (transferId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this demo receipt?"
    );

    if (!confirmed) return;

    try {
      setUpdatingTransfer(transferId);

      await deleteDoc(
        doc(db, "bank", "royalbank", "transfers", transferId)
      );

      alert("Demo receipt deleted successfully!");
    } catch (error) {
      console.error("Delete Transfer Error:", error);
      alert(
        "Could not delete receipt.\n" +
        error.code + ": " + error.message
      );
    } finally {
      setUpdatingTransfer(null);
    }
  };

  // Format Firestore timestamp.
  const formatTransferDate = (timestamp) => {
    if (!timestamp) return "Date unavailable";

    const date = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    if (isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  };

  const saveButton = {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "#005EB8",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const statusStyle = (value) => {
    const colors = {
      pending: { background: "#fff4d6", color: "#946200" },
      successful: { background: "#dcfce7", color: "#166534" },
      failed: { background: "#fee2e2", color: "#991b1b" },
    };

    return {
      display: "inline-block",
      padding: "7px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "uppercase",
      ...(colors[String(value || "pending").toLowerCase()] ||
        colors.pending),
    };
  };

  const sortedTransfers = [...transfers].sort((a, b) => {
    const dateA = a.createdAt?.toMillis?.() || 0;
    const dateB = b.createdAt?.toMillis?.() || 0;
    return dateB - dateA;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
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
        ← Back
      </button>

      <h1 style={{ color: "#00205B", marginBottom: "30px" }}>
        🏦 Royal Bank Admin Panel
      </h1>

      <div style={{ display: "grid", gap: "20px" }}>

        {/* TRANSFER MANAGER */}
        <div style={cardStyle}>
          <h3>💸 Transfer Manager</h3>

          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Review submitted fictional demo transfers and manage their statuses.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {[
              ["Pending", "pending", "#fff4d6", "#946200"],
              ["Successful", "successful", "#dcfce7", "#166534"],
              ["Failed", "failed", "#fee2e2", "#991b1b"],
            ].map(([label, value, background, color]) => (
              <div
                key={value}
                style={{
                  flex: 1,
                  minWidth: "100px",
                  padding: "12px",
                  borderRadius: "12px",
                  background,
                }}
              >
                <strong style={{ color }}>
                  {transfers.filter(
                    (item) => item.status?.toLowerCase() === value
                  ).length}
                </strong>
                <div style={{ fontSize: "12px", color }}>{label}</div>
              </div>
            ))}
          </div>

          {loadingTransfers ? (
            <p>Loading transfers...</p>
          ) : sortedTransfers.length === 0 ? (
            <div
              style={{
                padding: "25px",
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                color: "#64748b",
              }}
            >
              <h3>No transfers yet</h3>
              <p>New demo submissions will appear here.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "15px" }}>
              {sortedTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong style={{ color: "#00205B", fontSize: "17px" }}>
                      {transfer.recipientName || "Unknown recipient"}
                    </strong>

                    <span style={statusStyle(transfer.status)}>
                      {transfer.status || "pending"}
                    </span>
                  </div>

                  <h2 style={{ color: "#005EB8", margin: "12px 0" }}>
                    {transfer.amount || "—"}
                  </h2>

                  <p><strong>Bank:</strong> {transfer.bankName || "—"}</p>
                  <p><strong>Account number:</strong> {transfer.accountNumber || "—"}</p>
                  <p><strong>Sort code:</strong> {transfer.sortCode || "—"}</p>
                  <p><strong>Reference:</strong> {transfer.paymentReference || "—"}</p>

                  <p style={{ color: "#64748b", fontSize: "12px" }}>
                    Submitted: {formatTransferDate(transfer.createdAt)}
                  </p>

                  <label
                    style={{
                      display: "block",
                      marginTop: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Change transfer status
                  </label>

                  <select
                    value={(transfer.status || "pending").toLowerCase()}
                    disabled={updatingTransfer === transfer.id}
                    onChange={(e) =>
                      changeTransferStatus(transfer.id, e.target.value)
                    }
                    style={{
                      ...inputStyle,
                      marginTop: "8px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="successful">Successful</option>
                    <option value="failed">Failed</option>
                  </select>

                  {updatingTransfer === transfer.id && (
                    <p style={{ color: "#005EB8", fontSize: "13px" }}>
                      Processing...
                    </p>
                  )}

                  <button
                    onClick={() => deleteTransfer(transfer.id)}
                    disabled={updatingTransfer === transfer.id}
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginTop: "12px",
                      background: "#fee2e2",
                      color: "#991b1b",
                      border: "1px solid #fecaca",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      opacity: updatingTransfer === transfer.id ? 0.6 : 1,
                    }}
                  >
                    🗑 Delete Receipt
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CUSTOMER INFORMATION */}
        <div style={cardStyle}>
          <h3>👤 Customer Information</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer Name"
            style={inputStyle}
          />

          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Account Number"
            style={inputStyle}
          />

          <input
            value={sortCode}
            onChange={(e) => setSortCode(e.target.value)}
            placeholder="Sort Code"
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            App Currency
          </label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={inputStyle}
          >
            {currencyOptions.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            style={saveButton}
            onClick={() =>
              saveToFirebase({
                ...bank,
                customer: {
                  ...bank.customer,
                  name,
                  accountNumber,
                  sortCode,
                  currency,
                },
              })
            }
          >
            Save Customer
          </button>
        </div>

        {/* ACCOUNT MANAGEMENT */}
        <div style={cardStyle}>
          <h3>💰 Account Management</h3>

          <input
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Account Balance"
            style={inputStyle}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option>Dormant</option>
            <option>Active</option>
            <option>Frozen</option>
            <option>Closed</option>
          </select>

          <button
            style={saveButton}
            onClick={() =>
              saveToFirebase({
                ...bank,
                account: { ...bank.account, balance },
                customer: { ...bank.customer, status },
              })
            }
          >
            Save Account
          </button>
        </div>

        {/* CARD MANAGEMENT */}
        <div style={cardStyle}>
          <h3>💳 Card Management</h3>

          <input
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            placeholder="Card Type"
            style={inputStyle}
          />

          <input
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            placeholder="Expiry (MM/YY)"
            style={inputStyle}
          />

          <select
            value={cardStatus}
            onChange={(e) => setCardStatus(e.target.value)}
            style={inputStyle}
          >
            <option>Active</option>
            <option>Dormant</option>
            <option>Frozen</option>
            <option>Blocked</option>
          </select>

          <button
            style={saveButton}
            onClick={() =>
              saveToFirebase({
                ...bank,
                card: {
                  ...bank.card,
                  type: cardType,
                  expiry: cardExpiry,
                  status: cardStatus,
                },
              })
            }
          >
            Save Card
          </button>
        </div>

        {/* NOTIFICATION MANAGER */}
        <div style={cardStyle}>
          <h3>🔔 Notification Manager</h3>

          <input
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            placeholder="Notification Title"
            style={inputStyle}
          />

          <textarea
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            placeholder="Notification Message"
            style={{ ...inputStyle, height: "100px" }}
          />

          <select
            value={notificationPriority}
            onChange={(e) => setNotificationPriority(e.target.value)}
            style={inputStyle}
          >
            <option>Normal</option>
            <option>Important</option>
            <option>Urgent</option>
          </select>

          <button
            style={saveButton}
            onClick={async () => {
              if (
                !notificationTitle.trim() ||
                !notificationMessage.trim()
              ) {
                alert("Please complete all fields.");
                return;
              }

              const title =
                notificationPriority === "Urgent"
                  ? "🔴 " + notificationTitle
                  : notificationPriority === "Important"
                  ? "🟡 " + notificationTitle
                  : notificationTitle;

              const updatedBank = {
                ...bank,
                notifications: [
                  { title, message: notificationMessage },
                  ...(bank.notifications || []),
                ].slice(0, 5),
              };

              await saveToFirebase(updatedBank);

              setNotificationTitle("");
              setNotificationMessage("");
              setNotificationPriority("Normal");
            }}
          >
            Send Notification
          </button>
        </div>

        {/* SECURITY MANAGER */}
        <div style={cardStyle}>
          <h3>🔐 Security Manager</h3>

          <input
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            placeholder="Demo Security Code"
            style={inputStyle}
          />

          <button
            style={saveButton}
            onClick={() =>
              saveToFirebase({
                ...bank,
                security: {
                  ...bank.security,
                  code: securityCode,
                },
              })
            }
          >
            Save Security Code
          </button>
        </div>

      </div>
    </div>
  );
}

export default Admin;
