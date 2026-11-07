import React from "react";
import { useTranslation } from "react-i18next";

function Settings({ setPage }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        background: "#071B36",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>⚙️ {t("settings")}</h1>

      <button
        onClick={() => setPage("dashboard")}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          padding: "12px 25px",
          background: "#0B3D91",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ⬅ {t("backToDashboard")}
      </button>

      <div
        style={{
          background: "white",
          color: "#222",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "30px",
          maxWidth: "700px",
        }}
      >
        <h2>{t("accountSettings")}</h2>

        <hr />

        <p>🔒 {t("changePassword")}</p>

        <p>🔔 {t("notificationPreferences")}</p>

        <p>🌙 {t("darkMode")}</p>

        <p>🌍 {t("language")} : {t("englishUK")}</p>

        <p>🛡️ {t("twoFactorAuthentication")}</p>

        <p>📱 {t("trustedDevices")}</p>

        <p>🔐 {t("privacySecurity")}</p>

        <button
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "15px",
            background: "#0B3D91",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {t("saveChanges")}
        </button>
      </div>
    </div>
  );
}

export default Settings;