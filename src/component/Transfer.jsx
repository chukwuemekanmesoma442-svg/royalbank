
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Transfer({ setPage, setPendingTransfer }) {
  const { t } = useTranslation();
  const { bank } = useContext(BankContext);

  const [form, setForm] = useState({
    recipientName: "",
    bankName: "",
    accountNumber: "",
    sortCode: "",
    amount: "",
    paymentReference: "",
  });

  const [error, setError] = useState("");

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

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(
      Number.isFinite(numericAmount) ? numericAmount : 0
    );
  };

  const availableBalance = formatAmount(
    bank?.account?.balance ?? 0
  );

  const accountStatus =
    bank?.customer?.status || "Dormant";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleContinue = () => {
    const requiredFields = [
      "recipientName",
      "bankName",
      "accountNumber",
      "amount",
    ];

    const missing = requiredFields.some(
      (field) => !String(form[field]).trim()
    );

    if (missing) {
      setError(t("fillRequiredFields"));
      return;
    }

    const amount = Number(
      form.amount.replace(/,/g, "")
    );

    if (!Number.isFinite(amount) || amount <= 0) {
      setError(t("invalidAmount"));
      return;
    }

    if (!/^\d{6,18}$/.test(form.accountNumber.trim())) {
      setError(t("invalidAccountNumber"));
      return;
    }

    if (setPendingTransfer) {
      setPendingTransfer({
        ...form,
        amount: amount.toFixed(2),
      });
    }

    setPage("security");
  };

  const fields = [
    {
      name: "recipientName",
      placeholder: "recipientName",
    },
    {
      name: "bankName",
      placeholder: "bankName",
    },
    {
      name: "accountNumber",
      placeholder: "accountNumber",
    },
    {
      name: "sortCode",
      placeholder: "sortCode",
    },
    {
      name: "amount",
      placeholder: "amount",
      type: "number",
    },
  ];

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
        ← {t("back")}
      </button>

      <h2 style={{ color: "#00205B" }}>
        {t("bankTransfer")}
      </h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
        }}
      >
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type || "text"}
            placeholder={t(field.placeholder)}
            value={form[field.name]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}

        <textarea
          name="paymentReference"
          placeholder={t("paymentReference")}
          value={form.paymentReference}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "90px",
          }}
        />

        {/* ACCOUNT INFORMATION */}
        <div
          style={{
            background: "#eef5ff",
            padding: "18px",
            borderRadius: "12px",
            marginTop: "20px",
            border: "1px solid #d8e8fc",
          }}
        >
          <h4
            style={{
              color: "#00205B",
              margin: "0 0 15px",
            }}
          >
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
          <p
            style={{
              color: "#dc2626",
              background: "#fee2e2",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleContinue}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            background: "#005EB8",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {t("continueTransfer")}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const infoStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  color: "#334155",
  fontSize: "14px",
  margin: "12px 0",
};

export default Transfer;
