import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { t, i18n } = useTranslation();
  const { bank } = useContext(BankContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === bank.login.username &&
      password === bank.login.password
    ) {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#071B36",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          width: "360px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <option value="en">🇬🇧 English</option>
            <option value="da">🇩🇰 Dansk</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="es">🇪🇸 Español</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="pt">🇵🇹 Português</option>
            <option value="nl">🇳🇱 Nederlands</option>
            <option value="sv">🇸🇪 Svenska</option>
            <option value="no">🇳🇴 Norsk</option>
            <option value="fi">🇫🇮 Suomi</option>
            <option value="pl">🇵🇱 Polski</option>
            <option value="ro">🇷🇴 Română</option>
            <option value="el">🇬🇷 Ελληνικά</option>
            <option value="cs">🇨🇿 Čeština</option>
            <option value="uk">🇺🇦 Українська</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="tr">🇹🇷 Türkçe</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="he">🇮🇱 עברית</option>
            <option value="hi">🇮🇳 हिन्दी</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="ko">🇰🇷 한국어</option>
          </select>
        </div>

        <h2
          style={{
            textAlign: "center",
            color: "#071B36",
            marginBottom: "20px",
          }}
        >
          Royal Bank {t("login")}
        </h2>

        <input
          type="text"
          placeholder={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#0B3D91",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {t("login")}
        </button>
      </form>
    </div>
  );
}

export default Login;