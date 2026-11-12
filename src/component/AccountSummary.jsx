
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function AccountSummary() {
  const { t } = useTranslation();

  const { selectedCustomer } = useContext(BankContext);

  const customerData = selectedCustomer;

  const customer = customerData?.customer || {};
  const account = customerData?.account || {};

  const currencyOptions = {
    GBP: "GBP (£)",
    USD: "USD ($)",
    EUR: "EUR (€)",
    CAD: "CAD (C$)",
    AUD: "AUD (A$)",
  };

  const rawCurrency = account.currency || customer.currency || "GBP";

  const selectedCurrency =
    currencyOptions[rawCurrency] ||
    (rawCurrency.includes?.("(") ? rawCurrency : "GBP (£)");

  const accountNumber =
    account.accountNumber ||
    customer.accountNumber ||
    "—";

  const maskedAccountNumber = accountNumber.replace(
    /(\d{4})$/,
    "****$1"
  );

  const sortCode =
    account.sortCode ||
    customer.sortCode ||
    "—";

  const iban =
    account.iban ||
    customer.iban ||
    "Not provided";

  if (!customerData) {
    return (
      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "20px",
          marginTop: "25px",
          color: "#777",
        }}
      >
        Account details are unavailable.
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#123B65",
        borderRadius: "18px",
        padding: "20px",
        marginTop: "25px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {t("accountSummary")}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "18px",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <small style={{ color: "#777" }}>
            {t("sortCode")}
          </small>

          <h4 style={{ margin: "6px 0" }}>
            {sortCode}
          </h4>
        </div>

        <div>
          <small style={{ color: "#777" }}>
            {t("currency")}
          </small>

          <h4 style={{ margin: "6px 0" }}>
            {selectedCurrency}
          </h4>
        </div>
      </div>

      <hr style={{ margin: "18px 0" }} />

      <div>
        <small style={{ color: "#777" }}>
          IBAN
        </small>

        <div
          style={{
            fontWeight: "600",
            marginTop: "5px",
            wordBreak: "break-word",
          }}
        >
          {iban}
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <small style={{ color: "#777" }}>
          {t("number")}
        </small>

        <div style={{ fontWeight: "600", marginTop: "5px" }}>
          {maskedAccountNumber}
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
