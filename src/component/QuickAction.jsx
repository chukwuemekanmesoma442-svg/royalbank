
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiSend,
  FiCreditCard,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";

function QuickAction({ setPage }) {
  const { t } = useTranslation();

  const actions = [
    {
      icon: <FiSend size={22} />,
      title: t("transfer"),
      page: "transfer",
    },
    {
      icon: <FiDollarSign size={22} />,
      title: t("payments"),
      page: "transactions",
    },
    {
      icon: <FiCreditCard size={22} />,
      title: t("cards"),
      page: "cards",
    },
    {
      icon: <FiShield size={22} />,
      title: t("securityCode"),
      page: "security",
    },
  ];

  return (
    <div style={{ marginTop: "25px" }}>
      <h3
        style={{
          color: "#00205B",
          marginBottom: "15px",
        }}
      >
        {t("quickActions")}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "15px",
        }}
      >
        {actions.map((item) => (
          <button
            key={item.page}
            type="button"
            onClick={() => setPage(item.page)}
            style={{
              background: "#123B65",
              border: "none",
              borderRadius: "18px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(250, 243, 243, 0.08)",
              cursor: "pointer",
              transition: ".2s",
              width: "100%",
              minHeight: "105px",
            }}
          >
            <div
              style={{
                color: "#005EB8",
                marginBottom: "12px",
              }}
            >
              {item.icon}
            </div>

            <p
              style={{
                margin: 0,
                fontWeight: "600",
                color: "#fef6f6",
              }}
            >
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickAction;
