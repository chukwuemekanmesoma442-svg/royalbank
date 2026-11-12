
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
  const [currentUser, setCurrentUser] = useState(null);

  const t = translations[language];

  // Monitor Firebase authentication and administrator access.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthReady(false);
      setCurrentUser(user);
      setIsAdmin(false);

      if (!user) {
        setPage("login");
        setPendingTransfer(null);
        setCompletedTransfer(null);
        setSelectedTransfer(null);
        setAuthReady(true);
        return;
      }

      try {
        const adminSnapshot = await getDoc(
          doc(db, "admins", user.uid)
        );

        const authorized =
          adminSnapshot.exists() &&
          adminSnapshot.data().enabled === true;

        if (auth.currentUser?.uid !== user.uid) return;

        setIsAdmin(authorized);

        if (page === "login" || page === "admin-login") {
          setPage(authorized ? "admin" : "dashboard");
        }
      } catch (error) {
        console.error("Authentication verification error:", error);

        if (auth.currentUser?.uid === user.uid) {
          setIsAdmin(false);

          if (page === "login" || page === "admin-login") {
            setPage("dashboard");
          }
        }
      }

      if (auth.currentUser?.uid === user.uid) {
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Protect all customer pages.
  useEffect(() => {
    const customerPages = [
      "dashboard",
      "security",
      "profile",
      "notifications",
      "settings",
      "transactions",
      "support",
      "transfer",
      "cards",
      "receipt",
    ];

    if (
      authReady &&
      customerPages.includes(page) &&
      !currentUser
    ) {
      setPage("login");
    }
  }, [authReady, currentUser, page]);

  // Protect the Admin dashboard.
  useEffect(() => {
    if (authReady && page === "admin" && !isAdmin) {
      setPage("admin-login");
    }
  }, [authReady, isAdmin, page]);

  // Verify access before opening Admin.
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
          setCurrentUser(user);
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

    // Sign out when Admin leaves the Admin dashboard.
    if (page === "admin") {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign out error:", error);
      }

      setIsAdmin(false);
      setCurrentUser(null);
      setPage("login");
      return;
    }

    setPage(nextPage);
  };

  // Open a selected transaction receipt.
  const handleSelectTransfer = (transfer) => {
    setSelectedTransfer(transfer);
    setPage("receipt");
  };

  if (!authReady) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Checking secure access...
      </div>
    );
  }

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={() => setPage("dashboard")}
          onAdminAccess={() => setPage("admin-login")}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "dashboard" && currentUser && (
        <Dashboard
          setPage={setPage}
          onSelectTransfer={handleSelectTransfer}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "security" && currentUser && (
        <SecurityCode
          setPage={setPage}
          pendingTransfer={pendingTransfer}
          setCompletedTransfer={setCompletedTransfer}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "profile" && currentUser && (
        <Profile
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "notifications" && currentUser && (
        <Notifications
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "settings" && currentUser && (
        <Settings
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "transactions" && currentUser && (
        <Transactions
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "support" && currentUser && (
        <CustomerSupport
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "transfer" && currentUser && (
        <Transfer
          setPage={setPage}
          setPendingTransfer={setPendingTransfer}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "cards" && currentUser && (
        <Cards
          setPage={setPage}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "admin-login" && (
        <AdminLogin
          setPage={handleAdminNavigation}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "admin" && isAdmin && (
        <Admin
          setPage={handleAdminNavigation}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {page === "receipt" && currentUser && (
        <TransferReceipt
          transfer={selectedTransfer || completedTransfer}
          setPage={setPage}
        />
      )}
    </>
  );
}

export default App;
