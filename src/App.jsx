import { useState } from "react";
import Login from "./component/login.jsx";
import Dashboard from "./component/Dashboard.jsx";
import Transactions from "./component/Transactions.jsx";
import Transfer from "./component/Transfer.jsx";
import Profile from "./component/Profile.jsx";
import Notifications from "./component/Notifications.jsx";
import Settings from "./component/Settings.jsx";
import Admin from "./component/Admin.jsx";

function App() {
  const [page, setPage] = useState("login");

  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  if (page === "dashboard") {
    return <Dashboard setPage={setPage} />;
  }

  if (page === "transactions") {
    return <Transactions setPage={setPage} />;
  }

  if (page === "transfer") {
    return <Transfer setPage={setPage} />;
  }

  if (page === "profile") {
    return <Profile setPage={setPage} />;
  }

  if (page === "notifications") {
    return <Notifications setPage={setPage} />;
  }

  if (page === "settings") {
    return <Settings setPage={setPage} />;
  }

  if (page === "admin") {
    return <Admin setPage={setPage} />;
  }

  return <Dashboard setPage={setPage} />;
}

export default App;