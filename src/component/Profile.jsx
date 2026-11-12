
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
      <div style={styles.loading}>
        Loading your profile...
      </div>
    );
  }

  if (!selectedCustomer) {
    return (
      <div style={styles.loading}>
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
  const card = selectedCustomer.card || {};

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

  const Detail = ({ label, value }) => (
    <div style={styles.detail}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>
        {value || "Not provided"}
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <button
          onClick={() => setPage("dashboard")}
          style={styles.backButton}
        >
          ← {t("back")}
        </button>

        {/* PROFILE HEADER */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            {initials}
          </div>

          <div style={styles.brand}>
            ROYAL BANK
          </div>

          <h1 style={styles.name}>{fullName}</h1>

          <p style={styles.subtitle}>
            {account.accountType || t("personalCurrentAccount")}
          </p>

          <div style={styles.status}>
            <span
              style={{
                ...styles.statusDot,
                background: statusColor,
              }}
            />
            Account: {accountStatus}
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>
            PERSONAL INFORMATION
          </h3>

          <div style={styles.grid}>
            <Detail label="Full Name" value={fullName} />
            <Detail label="Gender" value={customer.gender} />
            <Detail label="Email Address" value={email} />
            <Detail label="Phone Number" value={customer.phone} />
            <Detail label="WhatsApp Number" value={customer.whatsapp} />
            <Detail
              label="Customer ID"
              value={selectedCustomer.id || currentUser?.uid}
            />
          </div>
        </section>

        {/* RESIDENTIAL ADDRESS */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>
            RESIDENTIAL ADDRESS
          </h3>

          <div style={styles.grid}>
            <Detail label="House Address" value={customer.houseAddress} />
            <Detail label="City" value={customer.city} />
            <Detail label="State / Province" value={customer.state} />
            <Detail label="Country" value={customer.country} />
            <Detail label="Postal Code" value={customer.postalCode} />
          </div>
        </section>

        {/* ACCOUNT INFORMATION */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>
            ACCOUNT INFORMATION
          </h3>

          <div style={styles.grid}>
            <Detail label="Account Number" value={account.accountNumber} />
            <Detail label="Sort Code" value={account.sortCode} />
            <Detail label="Account Type" value={account.accountType} />
            <Detail label="Currency" value={account.currency} />
            <Detail label="Account Status" value={accountStatus} />
          </div>
        </section>

        {/* CARD INFORMATION */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>
            CARD INFORMATION
          </h3>

          <div style={styles.grid}>
            <Detail label="Card Type" value={card.type} />
            <Detail label="Card Status" value={card.status} />
            <Detail label="Card Expiry" value={card.expiry} />
          </div>
        </section>

        <p style={styles.footer}>
          Royal Bank Demo Platform · Customer Profile
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#071B36",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  loading: {
    minHeight: "100vh",
    background: "#071B36",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  backButton: {
    background: "transparent",
    color: "#D4AF37",
    border: "1px solid rgba(212,175,55,0.5)",
    padding: "11px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  header: {
    marginTop: "28px",
    padding: "30px 20px",
    textAlign: "center",
    borderRadius: "22px",
    background: "linear-gradient(145deg, #102F52, #06152B)",
    border: "1px solid rgba(212,175,55,0.3)",
    boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
  },

  avatar: {
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
    fontSize: "34px",
    fontWeight: "bold",
  },

  brand: {
    color: "#D4AF37",
    fontSize: "11px",
    letterSpacing: "3px",
    fontWeight: "bold",
  },

  name: {
    margin: "10px 0 6px",
    fontSize: "26px",
  },

  subtitle: {
    color: "#B8C7D9",
    fontSize: "14px",
  },

  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "12px",
    padding: "8px 15px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.08)",
    fontSize: "12px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },

  section: {
    marginTop: "28px",
  },

  sectionTitle: {
    color: "#D4AF37",
    fontSize: "16px",
    letterSpacing: "1px",
    marginBottom: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },

  detail: {
    background: "#102B4C",
    border: "1px solid rgba(212,175,55,0.18)",
    borderRadius: "16px",
    padding: "17px",
    minWidth: 0,
  },

  label: {
    color: "#9DB0C8",
    fontSize: "12px",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  value: {
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    overflowWrap: "anywhere",
  },

  footer: {
    color: "#8295AE",
    fontSize: "11px",
    textAlign: "center",
    marginTop: "30px",
  },
};

export default Profile;
