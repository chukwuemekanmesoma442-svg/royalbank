import React from "react";
import { useTranslation } from "react-i18next";

function Logout() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        background: "#071B36",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          color: "#222",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          width: "400px",
        }}
      >
        <h1>👋 {t("loggedOut")}</h1>

        <p>{t("thankYouBanking")}</p>

        <p>{t("sessionEnded")}</p>
      </div>
    </div>
  );
}

export default Logout;