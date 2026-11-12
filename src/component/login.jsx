
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ onLogin, onAdminAccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    return () => clearTimeout(tapTimer.current);
  }, []);

  const handleBrandTap = () => {
    tapCount.current += 1;

    clearTimeout(tapTimer.current);

    if (tapCount.current >= 5) {
      tapCount.current = 0;
      onAdminAccess?.();
      return;
    }

    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter your email address and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      onLogin?.();
    } catch (error) {
      console.error("Customer login error:", error);

      const messages = {
        "auth/invalid-credential":
          "Incorrect email address or password.",
        "auth/user-not-found":
          "No account was found with this email address.",
        "auth/wrong-password":
          "Incorrect email address or password.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Please check your internet connection."
      };

      alert(
        messages[error.code] ||
        "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
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
          maxWidth: "calc(100% - 40px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          boxSizing: "border-box",
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
          onClick={handleBrandTap}
          style={{
            textAlign: "center",
            color: "#071B36",
            marginBottom: "20px",
            cursor: "default",
            userSelect: "none",
          }}
        >
          Royal Bank {t("login")}
        </h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
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
          autoComplete="current-password"
          required
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
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#7890b5" : "#0B3D91",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in..." : t("login")}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "11px",
            marginTop: "18px",
          }}
        >
          SIGN UP 
        </p>
      </form>
    </div>
  );
}

export default Login;
