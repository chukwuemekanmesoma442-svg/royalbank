import React, { useState } from "react";
import Login from "./component/login";
import Dashboard from "./component/Dashboard";
import SecurityCode from "./component/SecurityCode";
import Profile from "./component/Profile";
import Notifications from "./component/Notifications";
import Settings from "./component/Settings";
import Transactions from "./component/Transactions";
import CustomerSupport from "./component/CustomerSupport";
import Transfer from "./component/Transfer";
import Cards from "./component/Cards";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login onLogin={() => setPage("dashboard")} />
      )}

      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {page === "security" && (
        <SecurityCode setPage={setPage} />
      )}

      {page === "profile" && (
        <Profile setPage={setPage} />
      )}

      {page === "notifications" && (
        <Notifications setPage={setPage} />
      )}

      {page === "settings" && (
        <Settings setPage={setPage} />
      )}

      {page === "transactions" && (
        <Transactions setPage={setPage} />
      )}

      {page === "support" && (
        <CustomerSupport setPage={setPage} />
      )}

      {page === "transfer" && (
        <Transfer setPage={setPage} />
      )}

      {page === "cards" && (
        <Cards setPage={setPage} />
      )}
    </>
  );
}

export default App;