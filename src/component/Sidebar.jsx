
import React from "react";
import { useTranslation } from "react-i18next";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";

import {
  FiHome,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiHeadphones,
  FiX,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

function Sidebar({ menuOpen, setMenuOpen, setPage }) {
  const { t } = useTranslation();

  const menuItems = [
    { label: t("dashboard"), page: "dashboard", icon: FiHome },
    { label: t("transactions"), page: "transactions", icon: FiCreditCard },
    { label: t("profile"), page: "profile", icon: FiUser },
    { label: t("settings"), page: "settings", icon: FiSettings },
    { label: t("customerService"), page: "support", icon: FiHeadphones },
  ];

  const navigate = (page) => {
    setPage(page);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      setMenuOpen(false);
      await signOut(auth);
      setPage("login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Unable to log out. Please try again.");
    }
  };

  const menuButtonStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "13px 14px",
    border: "none",
    borderRadius: "10px",
    background: "transparent",
    color: "#123B65",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Arial, sans-serif",
    textAlign: "left",
    cursor: "pointer",
    transition: "background 0.2s ease",
  };

  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 15, 32, 0.55)",
            backdropFilter: "blur(2px)",
            zIndex: 999,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? 0 : "-300px",
          width: "280px",
          maxWidth: "85vw",
          height: "100vh",
          background: "#FFFFFF",
          color: "#123B65",
          transition: "left 0.3s ease",
          zIndex: 1000,
          padding: "22px 18px",
          boxSizing: "border-box",
          boxShadow: menuOpen
            ? "8px 0 30px rgba(0,0,0,0.15)"
            : "none",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Logo and close button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "20px",
            borderBottom: "1px solid #E5EAF0",
          }}
        >
          <img
            src={logo}
            alt="The Royal Bank"
            style={{
              width: "155px",
              height: "75px",
              objectFit: "contain",
            }}
          />

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              border: "none",
              background: "#F1F5F9",
              color: "#123B65",
              borderRadius: "8px",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Main menu heading */}
        <div
          style={{
            marginTop: "28px",
            marginBottom: "12px",
            paddingLeft: "14px",
            color: "#8795A8",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1.5px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          MAIN MENU
        </div>

        {/* Navigation items */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                style={menuButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#EEF3F8";
                  e.currentTarget.style.color = "#061A35";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#123B65";
                }}
              >
                <Icon size={19} strokeWidth={2} />
                <span style={{ flex: 1 }}>{item.label}</span>
                <FiChevronRight size={15} color="#A0AEC0" />
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "22px",
            borderTop: "1px solid #E5EAF0",
          }}
        >
          <div
            style={{
              paddingLeft: "14px",
              color: "#8795A8",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            SUPPORT
          </div>

          <button
            onClick={() => navigate("admin-login")}
            style={menuButtonStyle}
          >
            <FiHeadphones size={19} strokeWidth={2} />
            <span>Customer Service</span>
            <FiChevronRight size={15} color="#A0AEC0" />
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              ...menuButtonStyle,
              marginTop: "10px",
              color: "#C0392B",
              background: "#FFF3F2",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FDE5E3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF3F2";
            }}
          >
            <FiLogOut size={19} strokeWidth={2} />
            <span style={{ flex: 1 }}>Log Out</span>
            <FiChevronRight size={15} color="#C0392B" />
          </button>

          <div
            style={{
              marginTop: "22px",
              padding: "14px",
              background: "#F4F7FA",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#123B65",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              THE ROYAL BANK
            </div>

            <div
              style={{
                color: "#8996A7",
                fontSize: "10px",
                marginTop: "5px",
              }}
            >
              Secure Digital Banking
            </div>

            <div
              style={{
                width: "35px",
                height: "2px",
                background: "#D4AF37",
                margin: "10px auto 0",
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
