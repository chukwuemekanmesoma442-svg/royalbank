
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Transfer({ setPage, setPendingTransfer }) {
  const { t } = useTranslation();

  const {
    selectedCustomer,
    currentUser,
  } = useContext(BankContext);

  const customerData = selectedCustomer || {};
  const account = customerData.account || {};

  const [form, setForm] = useState({
    recipientName: "",
    recipientAddress: "",
    recipientCountry: "",
    bankName: "",
    bankAddress: "",
    accountNumber: "",
    iban: "",
    swiftBic: "",
    sortCode: "",
    amount: "",
    currency: account.currency || "GBP",
    accountType: "",
    paymentReference: "",
  });

  const [error, setError] = useState("");

  const allowedCurrencies = ["GBP", "USD", "EUR", "CAD", "AUD"];

  const savedCurrency = account.currency || "GBP";

  const accountCurrency = allowedCurrencies.includes(savedCurrency)
    ? savedCurrency
    : "GBP";

  const formatAmount = (amount) => {
    const numericAmount = Number(
      String(amount ?? "0")
        .replace(/,/g, "")
        .replace(/[^0-9.-]/g, "")
    );

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: accountCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(
      Number.isFinite(numericAmount) ? numericAmount : 0
    );
  };

  const availableBalance = formatAmount(account.balance ?? 0);
  const accountStatus = account.status || "Not set";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleContinue = () => {
    if (!currentUser || !selectedCustomer) {
      setError("Customer account information is unavailable. Please sign in again.");
      return;
    }

    const requiredFields = [
      "recipientName",
      "bankName",
      "amount",
      "currency",
    ];

    const missing = requiredFields.some(
      (field) => !String(form[field]).trim()
    );

    if (missing) {
      setError("Please complete all required fields.");
      return;
    }

    // A domestic account number or an international IBAN is required.
    if (!form.accountNumber.trim() && !form.iban.trim()) {
      setError("Enter an account number or IBAN.");
      return;
    }

    const amount = Number(form.amount.replace(/,/g, ""));

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid transfer amount.");
      return;
    }

    if (
      form.accountNumber.trim() &&
      !/^[a-zA-Z0-9\s-]{4,34}$/.test(form.accountNumber.trim())
    ) {
      setError("Please enter a valid account number.");
      return;
    }

    if (
      form.iban.trim() &&
      !/^[a-zA-Z0-9\s]{15,34}$/.test(form.iban.trim())
    ) {
      setError("Please enter a valid IBAN.");
      return;
    }

    if (
      form.swiftBic.trim() &&
      !/^[A-Za-z0-9]{8}([A-Za-z0-9]{3})?$/.test(
        form.swiftBic.trim()
      )
    ) {
      setError("Please enter a valid SWIFT/BIC code.");
      return;
    }

    if (setPendingTransfer) {
      setPendingTransfer({
        ...form,
        recipientName: form.recipientName.trim(),
        bankName: form.bankName.trim(),
        accountNumber: form.accountNumber.trim(),
        iban: form.iban.trim().toUpperCase(),
        swiftBic: form.swiftBic.trim().toUpperCase(),
        amount: amount.toFixed(2),
      });
    }

    setPage("security");
  };

  const textFields = [
    {
      name: "recipientName",
      label: "Beneficiary Full Name",
      placeholder: "Enter beneficiary's full name",
      required: true,
    },
    {
      name: "recipientAddress",
      label: "Beneficiary Address",
      placeholder: "Enter residential or business address",
    },
    {
      name: "recipientCountry",
      label: "Beneficiary Country",
      placeholder: "Enter country",
    },
    {
      name: "bankName",
      label: "Bank Name",
      placeholder: "Enter bank name",
      required: true,
    },
    {
      name: "bankAddress",
      label: "Bank Address",
      placeholder: "Enter bank branch address",
    },
    {
      name: "accountNumber",
      label: "Account Number",
      placeholder: "Enter account number (domestic transfers)",
    },
    {
      name: "iban",
      label: "IBAN",
      placeholder: "Enter IBAN (international transfers)",
    },
    {
      name: "swiftBic",
      label: "SWIFT / BIC",
      placeholder: "Enter SWIFT/BIC code",
    },
    {
      name: "sortCode",
      label: "Sort Code",
      placeholder: "Enter sort code (if applicable)",
    },
  ];

  if (!selectedCustomer || !currentUser) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h3>Customer account unavailable</h3>
        <p>Please sign in again and return to your dashboard.</p>
        <button onClick={() => setPage("dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <button
        onClick={() => setPage("dashboard")}
        style={backButtonStyle}
      >
        ← {t("back")}
      </button>

      <h2 style={{ color: "#00205B" }}>
        {t("bankTransfer")}
      </h2>

      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Beneficiary Information</h3>

        {textFields.slice(0, 3).map((field) => (
          <div key={field.name}>
            <label style={labelStyle}>
              {field.label}
              {field.required ? " *" : ""}
            </label>
            <input
              name={field.name}
              type="text"
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        ))}

        <h3 style={sectionTitleStyle}>Bank Information</h3>

        {textFields.slice(3).map((field) => (
          <div key={field.name}>
            <label style={labelStyle}>
              {field.label}
            </label>
            <input
              name={field.name}
              type="text"
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        ))}

        <h3 style={sectionTitleStyle}>Transfer Information</h3>

        <label style={labelStyle}>Transfer Amount *</label>
        <input
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Transfer Currency *</label>
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          style={inputStyle}
        >
          {allowedCurrencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Account Type</label>
        <select
          name="accountType"
          value={form.accountType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select account type</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
          <option value="Checking">Checking</option>
          <option value="Business">Business</option>
        </select>

        <label style={labelStyle}>Payment Reference / Purpose</label>
        <textarea
          name="paymentReference"
          placeholder="Enter payment reference or purpose"
          value={form.paymentReference}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "90px",
            resize: "vertical",
          }}
        />

        <div style={accountInfoStyle}>
          <h4 style={{ color: "#00205B", margin: "0 0 15px" }}>
            Account Information
          </h4>

          <p style={infoStyle}>
            <strong>{t("availableBalance")}:</strong>
            <strong style={{ color: "#005EB8" }}>
              {availableBalance}
            </strong>
          </p>

          <p style={infoStyle}>
            <strong>{t("transferFee")}:</strong>
            <span>{formatAmount(0)}</span>
          </p>

          <p style={{ ...infoStyle, marginBottom: 0 }}>
            <strong>{t("accountStatus")}:</strong>
            <span>{accountStatus}</span>
          </p>
        </div>

        {error && (
          <p style={errorStyle}>
            {error}
          </p>
        )}

        <button
          onClick={handleContinue}
          style={submitButtonStyle}
        >
          Submit Transfer
        </button>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  boxSizing: "border-box",
};

const cardStyle = {
  background: "#fff",
  padding: "22px",
  borderRadius: "15px",
  boxShadow: "0 3px 12px rgba(0,0,0,.08)",
  maxWidth: "700px",
  margin: "0 auto",
};

const backButtonStyle = {
  background: "#005EB8",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "20px",
};

const sectionTitleStyle = {
  color: "#00205B",
  fontSize: "17px",
  margin: "20px 0 15px",
  paddingBottom: "9px",
  borderBottom: "1px solid #e5e7eb",
};

const labelStyle = {
  display: "block",
  color: "#334155",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "15px",
  borderRadius: "9px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontSize: "14px",
  background: "#fff",
  color: "#1f2937",
  WebkitTextFillColor: "#1f2937",
  caretColor: "#005EB8",
};

const accountInfoStyle = {
  background: "#eef5ff",
  padding: "18px",
  borderRadius: "12px",
  marginTop: "20px",
  border: "1px solid #d8e8fc",
};

const infoStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  color: "#334155",
  fontSize: "14px",
  margin: "12px 0",
};

const errorStyle = {
  color: "#dc2626",
  background: "#fee2e2",
  padding: "10px",
  borderRadius: "8px",
  fontSize: "13px",
};

const submitButtonStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "15px",
  background: "#005EB8",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
};

export default Transfer;
