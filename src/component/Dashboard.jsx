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
function Dashboard({ setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        overfloY: "auto"
      }}
    >
      
<Header
  setMenuOpen={setMenuOpen}
  setPage={setPage}
/>
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
        <RecentTransactions />
      </div>
    </div>
  );
}

export default Dashboard;