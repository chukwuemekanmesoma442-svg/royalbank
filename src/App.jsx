
import React, { useState, useEffect } from "react";

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
import translations from "./translations";
import Admin from "./component/Admin";
import AdminLogin from "./component/AdminLogin";
import TransferReceipt from "./component/TransferReceipt";

import { auth, db } from "./firebase";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

function App() {
  const [page, setPage] = useState("login");

  const [pendingTransfer, setPendingTransfer] = useState(null);
  const [completedTransfer, setCompletedTransfer] = useState(null);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const [language, setLanguage] = useState("en");

  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const t = translations[language];

  // Verify Firebase authentication and administrator status.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthReady(false);

      if (!user) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }

      try {
        const adminRef = doc(db, "admins", user.uid);
        const adminSnapshot = await getDoc(adminRef);

        const authorized =
          adminSnapshot.exists() &&
          adminSnapshot.data().enabled === true;

        setIsAdmin(authorized);
      } catch (error) {
        console.error("Admin verification error:", error);
        setIsAdmin(false);
      }

      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Protect the Admin page against direct navigation.
  useEffect(() => {
    if (authReady && page === "admin" && !isAdmin) {
      setPage("admin-login");
    }
  }, [authReady, isAdmin, page]);

  // Secure navigation into and out of Admin.
  const handleAdminNavigation = async (nextPage) => {
    if (nextPage === "admin") {
      const user = auth.currentUser;

      if (!user) {
        setIsAdmin(false);
        setPage("admin-login");
        return;
      }

      try {
        const adminSnapshot = await getDoc(
          doc(db, "admins", user.uid)
        );

        if (
          adminSnapshot.exists() &&
          adminSnapshot.data().enabled === true
        ) {
          setIsAdmin(true);
          setAuthReady(true);
          setPage("admin");
        } else {
          await signOut(auth);
          setIsAdmin(false);
          setPage("admin-login");

          alert("This account is not authorized for staff access.");
        }
      } catch (error) {
        console.error("Admin access error:", error);

        await signOut(auth);
        setIsAdmin(false);
        setPage("admin-login");

        alert("Access verification failed. Please try again.");
      }

      return;
    }

    // Sign out when leaving the Admin dashboard.
    if (page === "admin") {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign out error:", error);
      }

      setIsAdmin(false);
    }

    setPage(nextPage);
  };

  // Open the receipt for a selected dashboard transaction.
  const handleSelectTransfer = (transfer) => {
    setSelectedTransfer(transfer);
    setPage("receipt");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={() => setPage("dashboard")}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          setPage={setPage}
          onSelectTransfer={handleSelectTransfer}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "security" && (
        <SecurityCode
          setPage={setPage}
          pendingTransfer={pendingTransfer}
          setCompletedTransfer={setCompletedTransfer}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "profile" && (
        <Profile
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "notifications" && (
        <Notifications
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "settings" && (
        <Settings
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "transactions" && (
        <Transactions
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "support" && (
        <CustomerSupport
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "transfer" && (
        <Transfer
          setPage={setPage}
          setPendingTransfer={setPendingTransfer}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "cards" && (
        <Cards
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {(page === "admin-login" ||
        (page === "admin" && authReady && !isAdmin)) && (
        <AdminLogin
          setPage={handleAdminNavigation}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "admin" && authReady && isAdmin && (
        <Admin
          setPage={handleAdminNavigation}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "admin" && !authReady && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          Verifying secure access...
        </div>
      )}

      {page === "receipt" && (
        <TransferReceipt
          transfer={selectedTransfer || completedTransfer}
          setPage={setPage}
        />
      )}
    </>
  );
}

export default App;
