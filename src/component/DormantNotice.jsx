import React from "react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";

function DormantNotice() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        background: "#FFF8E6",
        border: "1px solid #FFD166",
        borderRadius: "16px",
        padding: "18px",
        marginBottom: "20px",
        display: "flex",
        gap: "15px",
        alignItems: "flex-start",
      }}
    >
      <FiAlertTriangle
        size={28}
        color="#D97706"
        style={{ marginTop: "3px" }}
      />

      <div>
        <h3
          style={{
            margin: 0,
            color: "#8A4B00",
            fontSize: "18px",
          }}
        >
          {t("dormantAccountNotice")}
        </h3>

        <p
          style={{
            marginTop: "10px",
            color: "#6B4A00",
            lineHeight: "1.6",
            fontSize: "14px",
          }}
        >
          {t("dormantNoticeMessage")}
        </p>
      </div>
    </div>
  );
}

export default DormantNotice;