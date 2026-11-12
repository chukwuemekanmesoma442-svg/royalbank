
import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

import { BankContext } from "../context/BankContext";

import AccountSummary from "./AccountSummary";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BalanceCard from "./BalanceCard";
import BankCard from "./BankCard";
import QuickAction from "./QuickAction";
import RecentTransactions from "./RecentTransactions";
import DashboardWelcome from "./DashboardWelcome";
import OverviewCards from "./OverviewCards";

function Dashboard({ setPage, onSelectTransfer }) {
  const { i18n } = useTranslation();

  const {
    customerProfile,
    loadingCustomerProfile,
    isAdmin,
  } = useContext(BankContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const colors = {
    background: "#f8fafc",
    card: "#123B65",
    secondary: "#18558A",
    gold: "#D4AF37",
    white: "#FFFFFF",
    muted: "#D5E2F0",
    border: "rgba(212,175,55,0.25)",
  };

  if (!isAdmin && loadingCustomerProfile) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: colors.background,
        color: colors.gold,
        fontFamily: "Arial, sans-serif",
      }}>
        Loading your Royal Bank account...
      </div>
    );
  }

  if (!isAdmin && !customerProfile) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: colors.background,
        color: colors.white,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}>
        <h2 style={{ color: colors.gold }}>
          Account Profile Not Found
        </h2>

        <p style={{
          color: colors.muted,
          maxWidth: "400px",
        }}>
          Your login was successful, but no customer profile
          is linked to this account. Please contact the
          administrator.
        </p>

        <button
          onClick={() => setPage("login")}
          style={{
            marginTop: "15px",
            padding: "12px 24px",
            border: "1px solid " + colors.gold,
            borderRadius: "10px",
            background: colors.gold,
            color: colors.background,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  const panelStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "18px",
    padding: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
  };

  const sectionTitleStyle = {
    color: colors.gold,
    marginTop: "4px",
    marginBottom: "15px",
    fontSize: "17px",
    fontWeight: "bold",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: colors.background,
      color: colors.white,
      overflowY: "auto",
      fontFamily: "Arial, sans-serif",
    }}>
      <Header
        setMenuOpen={setMenuOpen}
        setPage={setPage}
      />

      <div style={{
        maxWidth: "1250px",
        margin: "0 auto",
        padding: "12px 16px",
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          aria-label="Choose language"
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: `1px solid ${colors.border}`,
            cursor: "pointer",
            background: colors.card,
            color: colors.white,
            outline: "none",
            maxWidth: "100%",
          }}
        >
          <option value="en">🇬🇧 English</option>
          <option value="da">🇩🇰 Danish</option>
          <option value="fr">🇫🇷 French</option>
          <option value="es">🇪🇸 Spanish</option>
          <option value="de">🇩🇪 German</option>
          <option value="it">🇮🇹 Italian</option>
          <option value="pt">🇵🇹 Portuguese</option>
          <option value="nl">🇳🇱 Dutch</option>
          <option value="sv">🇸🇪 Swedish</option>
          <option value="no">🇳🇴 Norwegian</option>
          <option value="fi">🇫🇮 Finnish</option>
          <option value="pl">🇵🇱 Polish</option>
          <option value="ro">🇷🇴 Romanian</option>
          <option value="cs">🇨🇿 Czech</option>
          <option value="uk">🇺🇦 Ukrainian</option>
          <option value="ru">🇷🇺 Russian</option>
          <option value="tr">🇹🇷 Turkish</option>
          <option value="ar">🇸🇦 Arabic</option>
          <option value="he">🇮🇱 Hebrew</option>
          <option value="hi">🇮🇳 Hindi</option>
          <option value="zh">🇨🇳 Chinese</option>
          <option value="ja">🇯🇵 Japanese</option>
          <option value="ko">🇰🇷 Korean</option>
        </select>
      </div>

      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setPage={setPage}
      />

      <main style={{
        maxWidth: "1250px",
        margin: "0 auto",
        padding: "12px 16px 100px",
        display: "grid",
        gap: "18px",
      }}>

        {/* Welcome section */}
        <section style={{
          background: `linear-gradient(135deg, ${colors.card}, ${colors.secondary})`,
          border: `1px solid ${colors.border}`,
          borderRadius: "20px",
          padding: "22px 18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
        }}>
          <div style={{
            color: colors.gold,
            fontSize: "11px",
            letterSpacing: "3px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}>
            ROYAL BANK
          </div>

          <DashboardWelcome />
        </section>

        {/* Account balance */}
        <section style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: "18px",
          padding: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
        }}>
          <BalanceCard />
        </section>

        {/* Overview */}
        <section style={panelStyle}>
          <OverviewCards />
        </section>

        {/* Bank card */}
        <section style={panelStyle}>
          <BankCard />
        </section>

        {/* Account summary */}
        <section style={panelStyle}>
          <AccountSummary />
        </section>

        {/* Quick actions */}
        <section style={panelStyle}>
          <h3 style={sectionTitleStyle}>
            Quick Actions
          </h3>

          <QuickAction setPage={setPage} />
        </section>

        {/* Recent transactions */}
        <section style={panelStyle}>
          <h3 style={sectionTitleStyle}>
            Recent Activity
          </h3>

          <RecentTransactions
            onSelectTransfer={onSelectTransfer}
          />
        </section>

      </main>
    </div>
  );
}

export default Dashboard;
