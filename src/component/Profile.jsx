
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function Profile({ setPage }) {
  const { t } = useTranslation();

  const {
    selectedCustomer,
    loadingCustomerProfile,
    currentUser,
  } = useContext(BankContext);

  if (loadingCustomerProfile) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#071B36",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontFamily: "Arial, sans-serif",
      }}>
        Loading your profile...
      </div>
    );
  }

  if (!selectedCustomer) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#071B36",
        color: "#fff",
        padding: "30px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}>
        <h2>Profile unavailable</h2>
        <p>We couldn't find a customer profile for this login.</p>
        <button onClick={() => setPage("dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const customer = selectedCustomer.customer || {};
  const account = selectedCustomer.account || {};

  const fullName = customer.name || "Customer";
  const email = selectedCustomer.email || currentUser?.email || "Not provided";

  const initials = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "C";

  const accountStatus = account.status || "Not set";
  const statusColor =
    accountStatus.toLowerCase() === "active"
      ? "#22c55e"
      : accountStatus.toLowerCase() === "dormant"
      ? "#f59e0b"
      : "#ef4444";

  const infoCard = {
    background: "#102B4C",
    border: "1px solid rgba(212,175,55,0.18)",
    borderRadius: "16px",
    padding: "17px",
    minWidth: 0,
  };

  const labelStyle = {
    color: "#9DB0C8",
    fontSize: "12px",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const valueStyle = {
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    overflowWrap: "anywhere",
  };

  const Detail = ({ label, value }) => (
    <div style={infoCard}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value || "Not provided"}</div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#071B36",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: "850px",
        margin: "0 auto",
      }}>
        <button
          onClick={() => setPage("dashboard")}
          style={{
            background: "transparent",
            color: "#D4AF37",
            border: "1px solid rgba(212,175,55,0.5)",
            padding: "11px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← {t("back")}
        </button>

        {/* Profile header */}
        <div style={{
          marginTop: "28px",
          padding: "30px 20px",
          textAlign: "center",
          borderRadius: "22px",
          background: "linear-gradient(145deg, #102F52, #06152B)",
          border: "1px solid rgba(212,175,55,0.3)",
          boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
        }}>
          <div style={{
            width: "104px",
            height: "104px",
            margin: "0 auto 16px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(145deg, #F5D76E, #B88A20)",
            color: "#071B36",
            border: "4px solid rgba(255,255,255,0.15)",
            boxShadow: "0 0 25px rgba(212,175,55,0.25)",
            fontSize: "34px",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}>
            {initials}
          </div>

          <div style={{
            color: "#D4AF37",
            fontSize: "11px",
            letterSpacing: "3px",
            fontWeight: "bold",
          }}>
            ROYAL BANK
          </div>

          <h1 style={{
            margin: "10px 0 6px",
            fontSize: "26px",
          }}>
            {fullName}
          </h1>

          <p style={{
            color: "#B8C7D9",
            margin: 0,
            fontSize: "14px",
          }}>
            {t("personalCurrentAccount")}
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "18px",
            padding: "8px 15px",
            borderRadius: "30px",
            background: "rgba(255,255,255,0.08)",
            fontSize: "12px",
          }}>
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: statusColor,
            }} />
            Account: {accountStatus}
          </div>
        </div>

        {/* Personal details */}
        <div style={{ marginTop: "28px" }}>
          <h3 style={{
            color: "#D4AF37",
            fontSize: "16px",
            letterSpacing: "1px",
            marginBottom: "15px",
          }}>
            PERSONAL INFORMATION
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}>
            <Detail label="Full name" value={fullName} />
            <Detail label="Email address" value={email} />
            <Detail
              label="Customer ID"
              value={selectedCustomer.id || currentUser?.uid}
            />
          </div>
        </div>

        {/* Account details */}
        <div style={{ marginTop: "28px" }}>
          <h3 style={{
            color: "#D4AF37",
            fontSize: "16px",
            letterSpacing: "1px",
            marginBottom: "15px",
          }}>
            ACCOUNT INFORMATION
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}>
            <Detail
              label={t("accountNumber")}
              value={customer.accountNumber}
            />
            <Detail
              label={t("sortCode")}
              value={customer.sortCode}
            />
            <Detail
              label={t("currency")}
              value={customer.currency}
            />
            <Detail
              label="Account status"
              value={accountStatus}
            />
          </div>
        </div>

        <p style={{
          color: "#8295AE",
          fontSize: "11px",
          textAlign: "center",
          marginTop: "30px",
        }}>
          Royal Bank Demo Platform · Customer Profile
        </p>
      </div>
    </div>
  );
}

export default Profile;
