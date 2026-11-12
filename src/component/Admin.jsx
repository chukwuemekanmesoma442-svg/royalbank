
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { BankContext } from "../context/BankContext";
import { db } from "../firebase";
import CustomerManager from "./CustomerManager";

import {
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const currencyOptions = [
  { code: "GBP", label: "British Pound (£)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "CAD", label: "Canadian Dollar (C$)" },
  { code: "AUD", label: "Australian Dollar (A$)" },
];

function Admin({ setPage }) {
  const {
    selectedCustomer,
    selectedCustomerId,
    saveCustomer,
    transfers = [],
    loadingTransfers,
  } = useContext(BankContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("Active");

  const [cardType, setCardType] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardStatus, setCardStatus] = useState("Inactive");

  const [securityCode, setSecurityCode] = useState("");

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationPriority, setNotificationPriority] =
    useState("Normal");

  const [saving, setSaving] = useState(false);
  const [updatingTransfer, setUpdatingTransfer] = useState(null);

  // Load the selected customer's details into the form.
  useEffect(() => {
    if (!selectedCustomer) {
      setName("");
      setEmail("");
      setAccountNumber("");
      setSortCode("");
      setCurrency("GBP");
      setBalance("");
      setStatus("Active");
      setCardType("");
      setCardExpiry("");
      setCardStatus("Inactive");
      setSecurityCode("");
      return;
    }

    const customer = selectedCustomer.customer || {};
    const account = selectedCustomer.account || {};
    const card = selectedCustomer.card || {};
    const security = selectedCustomer.security || {};

    setName(customer.name || "");
    setEmail(selectedCustomer.email || "");
    setAccountNumber(customer.accountNumber || "");
    setSortCode(customer.sortCode || "");

    setCurrency(
      currencyOptions.some(
        (item) => item.code === customer.currency
      )
        ? customer.currency
        : "GBP"
    );

    setBalance(account.balance ?? "");
    setStatus(account.status || "Active");

    setCardType(card.type || "");
    setCardExpiry(card.expiry || "");
    setCardStatus(card.status || "Inactive");

    setSecurityCode(security.code || "");
  }, [selectedCustomer, selectedCustomerId]);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
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
    marginTop: "18px",
    padding: "14px",
    background: "#005EB8",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: saving ? "not-allowed" : "pointer",
    opacity: saving ? 0.6 : 1,
  };

  const saveSelectedCustomer = async (updates) => {
    if (!selectedCustomerId || !selectedCustomer) {
      alert("Please select a customer first.");
      return false;
    }

    try {
      setSaving(true);

      await saveCustomer(selectedCustomerId, updates);

      alert("Selected customer's information saved successfully.");
      return true;
    } catch (error) {
      console.error("Customer Save Error:", error);
      alert("Could not save customer information: " + error.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveCustomerInformation = () =>
    saveSelectedCustomer({
      customer: {
        ...(selectedCustomer.customer || {}),
        name,
        accountNumber,
        sortCode,
        currency,
      },
      email,
    });

  const saveAccountInformation = () =>
    saveSelectedCustomer({
      account: {
        ...(selectedCustomer.account || {}),
        balance,
        status,
      },
    });

  const saveCardInformation = () =>
    saveSelectedCustomer({
      card: {
        ...(selectedCustomer.card || {}),
        type: cardType,
        expiry: cardExpiry,
        status: cardStatus,
      },
    });

  const saveSecurityInformation = () =>
    saveSelectedCustomer({
      security: {
        ...(selectedCustomer.security || {}),
        code: securityCode,
      },
    });

  const sendNotification = async () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert("Please complete the notification title and message.");
      return;
    }

    const title =
      notificationPriority === "Urgent"
        ? "🔴 " + notificationTitle.trim()
        : notificationPriority === "Important"
        ? "🟡 " + notificationTitle.trim()
        : notificationTitle.trim();

    const existingNotifications =
      selectedCustomer.notifications || [];

    const saved = await saveSelectedCustomer({
      notifications: [
        {
          title,
          message: notificationMessage.trim(),
          createdAt: new Date().toISOString(),
        },
        ...existingNotifications,
      ].slice(0, 5),
    });

    if (saved) {
      setNotificationTitle("");
      setNotificationMessage("");
      setNotificationPriority("Normal");
    }
  };

  const changeTransferStatus = async (transferId, newStatus) => {
    try {
      setUpdatingTransfer(transferId);

      await updateDoc(
        doc(db, "bank", "royalbank", "transfers", transferId),
        { status: newStatus }
      );

      alert("Demo transfer status updated.");
    } catch (error) {
      console.error("Transfer Update Error:", error);
      alert("Could not update transfer: " + error.message);
    } finally {
      setUpdatingTransfer(null);
    }
  };

  const deleteTransfer = async (transferId) => {
    const confirmed = window.confirm(
      "Permanently delete this fictional demo receipt?"
    );

    if (!confirmed) return;

    try {
      setUpdatingTransfer(transferId);

      await deleteDoc(
        doc(db, "bank", "royalbank", "transfers", transferId)
      );

      alert("Demo receipt deleted.");
    } catch (error) {
      console.error("Delete Transfer Error:", error);
      alert("Could not delete receipt: " + error.message);
    } finally {
      setUpdatingTransfer(null);
    }
  };

  const formatTransferDate = (timestamp) => {
    if (!timestamp) return "Date unavailable";

    const date = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    if (isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString("en-GB");
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

  const selectedTransfers = transfers
    .filter(
      (transfer) =>
        transfer.customerId === selectedCustomerId
    )
    .sort((a, b) => {
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

      <h1 style={{ color: "#00205B" }}>
        Royal Bank Admin Panel
      </h1>

      <CustomerManager />

      {!selectedCustomer ? (
        <div style={cardStyle}>
          <h3>No customer selected</h3>
          <p>Create or select a customer above to manage their demo account.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          <div style={cardStyle}>
            <h2 style={{ color: "#00205B" }}>
              Managing: {name || "Customer"}
            </h2>
            <p style={{ color: "#64748b" }}>
              All changes below apply only to this selected customer.
            </p>
            <p><strong>Customer ID:</strong> {selectedCustomerId}</p>
          </div>

          <div style={cardStyle}>
            <h3>Customer Information</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer Name"
              style={inputStyle}
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Customer Email"
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

            <label style={{ display: "block", marginTop: "15px" }}>
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
              disabled={saving}
              onClick={saveCustomerInformation}
            >
              Save Customer Information
            </button>
          </div>

          <div style={cardStyle}>
            <h3>Account Management</h3>

            <input
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Demo Account Balance"
              style={inputStyle}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputStyle}
            >
              <option>Active</option>
              <option>Dormant</option>
              <option>Frozen</option>
              <option>Closed</option>
            </select>

            <button
              style={saveButton}
              disabled={saving}
              onClick={saveAccountInformation}
            >
              Save Account Information
            </button>
          </div>

          <div style={cardStyle}>
            <h3>Card Management</h3>

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
              <option>Inactive</option>
              <option>Dormant</option>
              <option>Frozen</option>
              <option>Blocked</option>
            </select>

            <button
              style={saveButton}
              disabled={saving}
              onClick={saveCardInformation}
            >
              Save Card Information
            </button>
          </div>

          <div style={cardStyle}>
            <h3>Notification Manager</h3>

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
              disabled={saving}
              onClick={sendNotification}
            >
              Send Notification to Selected Customer
            </button>
          </div>

          <div style={cardStyle}>
            <h3>Security Manager</h3>

            <input
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Demo Security Code"
              style={inputStyle}
            />

            <button
              style={saveButton}
              disabled={saving}
              onClick={saveSecurityInformation}
            >
              Save Security Code
            </button>
          </div>

          <div style={cardStyle}>
            <h3>Transfer Manager</h3>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Fictional demo transfers for this selected customer only.
            </p>

            {loadingTransfers ? (
              <p>Loading transfers...</p>
            ) : selectedTransfers.length === 0 ? (
              <p>No demo transfers for this customer yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "15px" }}>
                {selectedTransfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <strong>
                      {transfer.recipientName || "Unknown recipient"}
                    </strong>

                    <h2 style={{ color: "#005EB8" }}>
                      {transfer.amount || "—"}
                    </h2>

                    <p><strong>Bank:</strong> {transfer.bankName || "—"}</p>
                    <p><strong>Account:</strong> {transfer.accountNumber || "—"}</p>
                    <p><strong>Reference:</strong> {transfer.paymentReference || "—"}</p>
                    <p style={{ fontSize: "12px", color: "#64748b" }}>
                      Submitted: {formatTransferDate(transfer.createdAt)}
                    </p>

                    <span style={statusStyle(transfer.status)}>
                      {transfer.status || "pending"}
                    </span>

                    <label style={{ display: "block", marginTop: "15px" }}>
                      Change demo transfer status
                    </label>

                    <select
                      value={(transfer.status || "pending").toLowerCase()}
                      disabled={updatingTransfer === transfer.id}
                      onChange={(e) =>
                        changeTransferStatus(transfer.id, e.target.value)
                      }
                      style={inputStyle}
                    >
                      <option value="pending">Pending</option>
                      <option value="successful">Successful</option>
                      <option value="failed">Failed</option>
                    </select>

                    <button
                      disabled={updatingTransfer === transfer.id}
                      onClick={() => deleteTransfer(transfer.id)}
                      style={{
                        ...saveButton,
                        background: "#fee2e2",
                        color: "#991b1b",
                      }}
                    >
                      Delete Demo Receipt
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
