
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function DashboardWelcome() {
  const { t } = useTranslation();

  const { selectedCustomer } = useContext(BankContext);

  const customerName =
    selectedCustomer?.customer?.name || "Customer";

  const today = new Date();

  const date = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#f6f8fa",
          fontSize: "26px",
          fontWeight: "700",
        }}
      >
        {t("goodDay")}, {customerName} .
      </h2>

      <p
        style={{
          color: "#18d60e",
          marginTop: "8px",
          fontSize: "14px",
        }}
      >
        {date}
      </p>
    </div>
  );
}

export default DashboardWelcome;
