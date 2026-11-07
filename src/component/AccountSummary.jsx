
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function AccountSummary() {
  const { t } = useTranslation();
  const { bank } = useContext(BankContext);

  const currencyOptions = {
    GBP: "GBP (£)",
    USD: "USD ($)",
    EUR: "EUR (€)",
    CAD: "CAD (C$)",
    AUD: "AUD (A$)",
  };

  const selectedCurrency =
    currencyOptions[bank?.customer?.currency] || "GBP (£)";

  return (
    <div
      style={{
        background: "#ffffff",
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
            {bank?.customer?.sortCode || "—"}
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <small style={{ color: "#777" }}>
            IBAN
          </small>

          <div
            style={{
              fontWeight: "600",
              marginTop: "5px",
            }}
          >
            GB29 RBOS 6016 ****2874
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
