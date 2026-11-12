
import React, { useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

import { BankContext } from "../context/BankContext";
import { db, customerAuth } from "../firebase";

function CustomerManager() {
  const {
    customers = [],
    saveCustomer,
    selectedCustomerId,
    selectCustomer,
  } = useContext(BankContext);

  const [selectedId, setSelectedId] = useState(selectedCustomerId || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("Active");

  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  // Demo-only password reference.
  const [demoPassword, setDemoPassword] = useState("");
  const [showDemoPassword, setShowDemoPassword] = useState(false);
  const [demoPasswordSaved, setDemoPasswordSaved] = useState(false);

  useEffect(() => {
    setSelectedId(selectedCustomerId || "");
  }, [selectedCustomerId]);

  function selectCustomerRecord(id) {
    setSelectedId(id);
    selectCustomer(id);

    const customer = customers.find((item) => item.id === id);

    if (!customer) {
      setName("");
      setEmail("");
      setAccountNumber("");
      setBalance("");
      setStatus("Active");
      setPassword("");
      setDemoPassword("");
      setDemoPasswordSaved(false);
      return;
    }

    setName(customer.customer?.name || "");
    setEmail(customer.email || "");
    setAccountNumber(customer.account?.accountNumber || "");
    setBalance(customer.account?.balance ?? "");
    setStatus(customer.account?.status || "Active");
    setPassword("");
    setDemoPassword("");
    setDemoPasswordSaved(false);
  }

  function newCustomer() {
    setSelectedId("");
    selectCustomer("");

    setName("");
    setEmail("");
    setPassword("");
    setAccountNumber("");
    setBalance("");
    setStatus("Active");

    setDemoPassword("");
    setDemoPasswordSaved(false);
    setShowDemoPassword(false);
  }

  // CREATE OR UPDATE CUSTOMER PROFILE
  async function handleSave() {
    if (!name.trim() || !email.trim() || !accountNumber.trim()) {
      alert("Please enter the customer's name, email and account number.");
      return;
    }

    if (!selectedId && password.length < 6) {
      alert("Please create a password with at least 6 characters.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
      setSaving(true);

      let customerId = selectedId;

      if (!customerId) {
        const credential = await createUserWithEmailAndPassword(
          customerAuth,
          cleanEmail,
          password
        );

        customerId = credential.user.uid;
      }

      const profile = {
        customer: {
          name: name.trim(),
        },
        email: cleanEmail,
        account: {
          accountNumber: accountNumber.trim(),
          balance: Number(balance) || 0,
          status,
          currency: "GBP",
        },
        card: {
          type: "Visa",
          expiry: "",
          status: "Active",
        },
        security: {
          code: "",
        },
        notifications: [],
        recentTransactions: [],
        demo: true,
        updatedAt: serverTimestamp(),
      };

      if (!selectedId) {
        profile.createdAt = serverTimestamp();
      }

      await setDoc(
        doc(db, "bank", "royalbank", "customers", customerId),
        profile,
        { merge: true }
      );

      if (selectedId && saveCustomer) {
        await saveCustomer(customerId, profile);
      }

      setSelectedId(customerId);
      selectCustomer(customerId);
      setPassword("");

      alert(
        selectedId
          ? "Customer profile updated successfully."
          : "Customer login account created successfully!"
      );
    } catch (error) {
      console.error("Customer save error:", error);

      const messages = {
        "auth/email-already-in-use":
          "This email already has a Firebase login account.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/weak-password":
          "Please choose a stronger password.",
        "permission-denied":
          "Firebase denied this action. Check your Firestore rules.",
      };

      alert(messages[error.code] || error.message);
    } finally {
      setSaving(false);
    }
  }

  // SEND ACTUAL FIREBASE PASSWORD RESET EMAIL
  async function handlePasswordReset() {
    if (!selectedId || !email.trim()) {
      alert("Select a customer with a valid email address first.");
      return;
    }

    try {
      setSendingReset(true);

      await sendPasswordResetEmail(
        customerAuth,
        email.trim().toLowerCase()
      );

      alert(
        "Password reset email sent to " +
          email.trim().toLowerCase()
      );
    } catch (error) {
      console.error("Password reset error:", error);
      alert(error.message);
    } finally {
      setSendingReset(false);
    }
  }

  // DEMO PASSWORD REFERENCE ONLY
  function saveDemoPassword() {
    if (!selectedId) {
      alert("Select a customer first.");
      return;
    }

    if (demoPassword.length < 6) {
      alert("Enter at least 6 characters for the demo password.");
      return;
    }

    setDemoPasswordSaved(true);

    alert(
      "Demo password reference confirmed for this Admin session. The actual Firebase login password has not changed."
    );
  }

  async function copyDemoPassword() {
    if (!demoPassword) return;

    try {
      await navigator.clipboard.writeText(demoPassword);
      alert("Demo password copied.");
    } catch {
      alert("Copy failed. Please copy the password manually.");
    }
  }

  // DELETE CUSTOMER PROFILE AND DEMO TRANSFER HISTORY
  async function handleDeleteCustomer() {
    if (!selectedId) {
      alert("Please select a customer first.");
      return;
    }

    const customer = customers.find(
      (item) => item.id === selectedId
    );

    const customerName =
      customer?.customer?.name || name || "this customer";

    const confirmed = window.confirm(
      `Are you sure you want to delete ${customerName}?\n\n` +
      "This will permanently delete their Firestore customer profile " +
      "and demo transfer history.\n\n" +
      "Their Firebase Authentication login must be deleted separately."
    );

    if (!confirmed) return;

    try {
      setSaving(true);

      const transfersRef = collection(
        db,
        "bank",
        "royalbank",
        "transfers"
      );

      const transfersQuery = query(
        transfersRef,
        where("customerId", "==", selectedId)
      );

      const transferSnapshot = await getDocs(transfersQuery);

      // Delete transfers in batches.
      const transferDocs = transferSnapshot.docs;

      for (let i = 0; i < transferDocs.length; i += 450) {
        const batch = writeBatch(db);

        const group = transferDocs.slice(i, i + 450);

        group.forEach((transfer) => {
          batch.delete(transfer.ref);
        });

        await batch.commit();
      }

      // Delete the customer Firestore profile.
      await deleteDoc(
        doc(
          db,
          "bank",
          "royalbank",
          "customers",
          selectedId
        )
      );

      // Clear selected customer and form.
      setSelectedId("");
      selectCustomer("");

      setName("");
      setEmail("");
      setPassword("");
      setAccountNumber("");
      setBalance("");
      setStatus("Active");

      setDemoPassword("");
      setDemoPasswordSaved(false);
      setShowDemoPassword(false);

      alert(
        "Customer profile and demo transfer history deleted.\n\n" +
        "Please remove the customer's Firebase Authentication account " +
        "separately through Firebase Console."
      );
    } catch (error) {
      console.error("Customer deletion error:", error);

      alert(
        "Unable to complete customer deletion: " + error.message
      );
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "14px",
    boxSizing: "border-box",
    border: "1px solid #526477",
    borderRadius: "6px",
    background: "#123B65",
    color: "#FFFFFF",
  };

  const buttonStyle = {
    padding: "12px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#D4AF37",
    color: "#071B36",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "#18558A",
    color: "#FFFFFF",
    border: "1px solid #D4AF37",
  };

  return (
    <div
      style={{
        padding: "22px",
        marginBottom: "25px",
        background: "#071B36",
        color: "white",
        borderRadius: "12px",
      }}
    >
      <h2>Customer Management</h2>

      <p style={{ color: "#D4AF37" }}>
        DEMO ENVIRONMENT — Test customer accounts only.
      </p>

      <label>
        Select Customer

        <select
          value={selectedId}
          onChange={(e) => selectCustomerRecord(e.target.value)}
          style={inputStyle}
        >
          <option value="">Create a new customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.customer?.name || customer.id}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={newCustomer}
        style={buttonStyle}
      >
        + New Customer
      </button>

      <hr style={{ margin: "22px 0", borderColor: "#526477" }} />

      <label>
        Customer Name

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        Email Address

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </label>

      {!selectedId && (
        <label>
          Create Customer Password

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            style={inputStyle}
          />
        </label>
      )}

      {selectedId && (
        <div
          style={{
            padding: "16px",
            marginBottom: "20px",
            background: "#123B65",
            border: "1px solid #D4AF37",
            borderRadius: "9px",
          }}
        >
          <h3 style={{ color: "#D4AF37", marginTop: 0 }}>
            Demo Password Manager
          </h3>

          <p style={{ fontSize: "13px", color: "#D5E2F0" }}>
            Demo reference only. This does not change the actual
            Firebase login password.
          </p>

          <label>
            Demo Password

            <input
              type={showDemoPassword ? "text" : "password"}
              value={demoPassword}
              onChange={(e) => {
                setDemoPassword(e.target.value);
                setDemoPasswordSaved(false);
              }}
              placeholder="Enter a demo password"
              style={inputStyle}
            />
          </label>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setShowDemoPassword(!showDemoPassword)
              }
              style={secondaryButtonStyle}
            >
              {showDemoPassword ? "Hide Password" : "Show Password"}
            </button>

            <button
              type="button"
              onClick={copyDemoPassword}
              disabled={!demoPassword}
              style={secondaryButtonStyle}
            >
              Copy Password
            </button>

            <button
              type="button"
              onClick={saveDemoPassword}
              style={buttonStyle}
            >
              Save Demo Reference
            </button>
          </div>

          {demoPasswordSaved && (
            <p style={{ color: "#D4AF37", marginBottom: 0 }}>
              Demo reference confirmed for this session.
            </p>
          )}

          <hr
            style={{
              borderColor: "#526477",
              margin: "18px 0",
            }}
          />

          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={sendingReset}
            style={secondaryButtonStyle}
          >
            {sendingReset
              ? "Sending..."
              : "Send Actual Password Reset Email"}
          </button>
        </div>
      )}

      <label>
        Account Number

        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        Balance (demo value)

        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        Account Status

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option>Active</option>
          <option>Dormant</option>
          <option>Restricted</option>
        </select>
      </label>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || sendingReset}
        style={{
          ...buttonStyle,
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving
          ? "Processing..."
          : selectedId
          ? "Update Customer"
          : "Create Customer Login"}
      </button>

      {selectedId && (
        <button
          type="button"
          onClick={handleDeleteCustomer}
          disabled={saving || sendingReset}
          style={{
            width: "100%",
            marginTop: "14px",
            padding: "13px",
            background: "#B42318",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          Delete Customer
        </button>
      )}

      <p style={{ marginTop: "18px" }}>
        Total demo customer records: {customers.length}
      </p>
    </div>
  );
}

export default CustomerManager;
