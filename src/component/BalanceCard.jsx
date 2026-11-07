
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function BalanceCard() {
  const { t } = useTranslation();
  const { bank } = useContext(BankContext);

  // Get the currency selected in Admin.
  const savedCurrency = bank?.customer?.currency || "GBP";

const currency = ["GBP", "USD", "EUR", "CAD", "AUD"].includes(savedCurrency)
  ? savedCurrency
  : "GBP";

  // Extract the numeric balance, regardless of its old symbol.
  const rawBalance = String(bank?.account?.balance ?? "0");
  const numericBalance = Number(
    rawBalance.replace(/[^0-9.-]/g, "")
  );

  // Format the balance using the selected currency.
  const formattedBalance = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(
    Number.isFinite(numericBalance) ? numericBalance : 0
  );

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00205B, #005EB8)",
        borderRadius: "20px",
        padding: "20px",
        color: "#fff",
        marginTop: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <p
        style={{
          margin: 0,
          opacity: 0.8,
          fontSize: "14px",
        }}
      >
        {t("availableBalance")}
      </p>

      <h1
        style={{
          margin: "12px 0",
          fontSize: "32px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        {formattedBalance}
      </h1>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          margin: "18px 0",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              opacity: 0.7,
              fontSize: "12px",
            }}
          >
            {t("account")}
          </p>

          <h4 style={{ margin: "5px 0" }}>
            {t("currentAccount")}
          </h4>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              margin: 0,
              opacity: 0.7,
              fontSize: "12px",
            }}
          >
            {t("number")}
          </p>

          <h4 style={{ margin: "5px 0" }}>
            {bank.customer.accountNumber}
          </h4>
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "inline-block",
          background: "#FFD54F",
          color: "#000",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        {bank.customer.status} {t("account")}
      </div>
    </div>
  );
}

export default BalanceCard;
