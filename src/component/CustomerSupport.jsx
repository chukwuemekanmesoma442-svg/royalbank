import React from "react";
import { useTranslation } from "react-i18next";

function CustomerSupport({ setPage }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "#f5f7fb",
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
          marginBottom: "25px",
        }}
      >
        ← {t("back")}
      </button>

      <h2 style={{ color: "#00205B" }}>
        {t("customerSupport")}
      </h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
          marginTop: "20px",
        }}
      >
        <h3>{t("helpCentre")}</h3>

        <p>
          {t("supportMessage")}
        </p>

        <p>
          <strong>Email:</strong> royalbankhqplc@gmail.com
        </p>

        <p>
          <strong>Phone:</strong> +1(213)934-0070
        </p>

        <button
          onClick={() => setPage("security")}
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
          {t("verifySecurityCode")}
        </button>
      </div>
    </div>
  );
}

export default CustomerSupport;