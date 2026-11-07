
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import AccountSummary from "./AccountSummary";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DormantNotice from "./DormantNotice";
import BalanceCard from "./BalanceCard";
import BankCard from "./BankCard";
import QuickAction from "./QuickAction";
import RecentTransactions from "./RecentTransactions";
import DashboardWelcome from "./DashboardWelcome";
import OverviewCards from "./OverviewCards";

function Dashboard({ setPage, onSelectTransfer }) {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        overflowY: "auto",
      }}
    >
      <Header
        setMenuOpen={setMenuOpen}
        setPage={setPage}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 16px",
        }}
      >
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
            background: "#fff",
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

      <div
        style={{
          padding: "16px",
          paddingBottom: "100px",
        }}
      >
        <DashboardWelcome />

        <BalanceCard />
        <OverviewCards />
        <BankCard />
        <AccountSummary />
        <QuickAction setPage={setPage} />

        <RecentTransactions
          onSelectTransfer={onSelectTransfer}
        />
      </div>
    </div>
  );
}

export default Dashboard;
