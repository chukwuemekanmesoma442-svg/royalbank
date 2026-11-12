
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { FiMenu, FiBell } from "react-icons/fi";
import { BankContext } from "../context/BankContext";

function Header({ setMenuOpen, setPage }) {
  const { t } = useTranslation();

  const {
    customerProfile,
    selectedCustomer,
    isAdmin,
  } = useContext(BankContext);

  const profile = isAdmin ? selectedCustomer : customerProfile;

  const customerName =
    profile?.customer?.name ||
    profile?.customer?.fullName ||
    profile?.name ||
    "";

  const initials = customerName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("") || "?";

  return (
    <header
      style={{
        background: "#FFFFFF",
        padding: "13px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #fffdf7",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 5px 16px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiMenu
            color="#000000"
            size={29}
            strokeWidth={3}
          />
        </button>

        <img
          src={logo}
          alt={t("royalBank")}
          style={{
            height: "52px",
            maxWidth: "180px",
            objectFit: "contain",
            filter: "contrast(1.4) saturate(1.15)",
            transform: "scale(1.08)",
            transformOrigin: "left center",
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
        <button
          onClick={() => setPage("notifications")}
          aria-label="Notifications"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          <FiBell
            size={24}
            color="#123B65"
            strokeWidth={2.5}
          />
        </button>

        <button
          onClick={() => setPage("profile")}
          aria-label="Open customer profile"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4AF37, #F0D778)",
            color: "#061A35",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "900",
            fontSize: "15px",
            cursor: "pointer",
            border: "2px solid #123B65",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          }}
        >
          {initials}
        </button>
      </div>
    </header>
  );
}

export default Header;
