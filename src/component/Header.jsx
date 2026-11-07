import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { FiMenu, FiBell } from "react-icons/fi";

function Header({ setMenuOpen, setPage }) {
  const { t } = useTranslation();

  return (
    <header
      style={{
        background: "#ffffff",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          <FiMenu color="#00205B" size={26} />
        </button>

        <img
          src={logo}
          alt={t("royalBank")}
          style={{
            height: "42px",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <FiBell
          size={22}
          color="#00205B"
          style={{ cursor: "pointer" }}
          onClick={() => setPage("notifications")}
        />

        <div
          onClick={() => setPage("profile")}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#005EB8",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          KR
        </div>
      </div>
    </header>
  );
}

export default Header;