
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

// Keep Field outside CustomerManager to prevent input focus loss.
function Field({ label, children }) {
  return (
    <label style={{ display: "block", fontSize: "14px" }}>
      {label}
      {children}
    </label>
  );
}

function CustomerManager() {
  const {
    customers = [],
    saveCustomer,
    selectedCustomerId,
    selectCustomer,
  } = useContext(BankContext);

  const [selectedId, setSelectedId] = useState(selectedCustomerId || "");

  // Personal details
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Residential address
  const [houseAddress, setHouseAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Account details
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountType, setAccountType] = useState("Personal Current Account");
  const [currency, setCurrency] = useState("GBP");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("Active");

  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  // Demo-only password reference
  const [demoPassword, setDemoPassword] = useState("");
  const [showDemoPassword, setShowDemoPassword] = useState(false);
  const [demoPasswordSaved, setDemoPasswordSaved] = useState(false);

  useEffect(() => {
    setSelectedId(selectedCustomerId || "");
  }, [selectedCustomerId]);

  function resetForm() {
    setName("");
    setGender("");
    setEmail("");
    setPhone("");
    setWhatsapp("");

    setHouseAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPostalCode("");

    setPassword("");
    setAccountNumber("");
    setSortCode("");
    setAccountType("Personal Current Account");
    setCurrency("GBP");
    setBalance("");
    setStatus("Active");

    setDemoPassword("");
    setDemoPasswordSaved(false);
    setShowDemoPassword(false);
  }

  function selectCustomerRecord(id) {
    setSelectedId(id);
    selectCustomer(id);

    const customer = customers.find((item) => item.id === id);

    if (!customer) {
      resetForm();
      return;
    }

    const personal = customer.customer || {};
    const account = customer.account || {};

    setName(personal.name || "");
    setGender(personal.gender || "");
    setEmail(customer.email || "");
    setPhone(personal.phone || "");
    setWhatsapp(personal.whatsapp || "");

    setHouseAddress(personal.houseAddress || "");
    setCity(personal.city || "");
    setState(personal.state || "");
    setCountry(personal.country || "");
    setPostalCode(personal.postalCode || "");

    setAccountNumber(account.accountNumber || "");
    setSortCode(account.sortCode || "");
    setAccountType(account.accountType || "Personal Current Account");
    setCurrency(account.currency || "GBP");
    setBalance(account.balance ?? "");
    setStatus(account.status || "Active");

    setPassword("");
    setDemoPassword("");
    setDemoPasswordSaved(false);
    setShowDemoPassword(false);
  }

  function newCustomer() {
    setSelectedId("");
    selectCustomer("");
    resetForm();
  }

  // CREATE OR UPDATE CUSTOMER
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
          gender: gender.trim(),
          phone: phone.trim(),
          whatsapp: whatsapp.trim(),
          houseAddress: houseAddress.trim(),
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          postalCode: postalCode.trim(),
        },

        email: cleanEmail,

        account: {
          accountNumber: accountNumber.trim(),
          sortCode: sortCode.trim(),
          accountType,
          balance: Number(balance) || 0,
          status,
          currency,
        },

        card: {
          type: "Visa",
          expiry: "",
          status: "Active",
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

  // SEND FIREBASE PASSWORD RESET
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

      alert("Password reset email sent to " + email.trim().toLowerCase());
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

  // DELETE CUSTOMER AND DEMO TRANSFERS
  async function handleDeleteCustomer() {
    if (!selectedId) {
      alert("Please select a customer first.");
      return;
    }

    const customer = customers.find((item) => item.id === selectedId);
    const customerName = customer?.customer?.name || name || "this customer";

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
      const transferDocs = transferSnapshot.docs;

      for (let i = 0; i < transferDocs.length; i += 450) {
        const batch = writeBatch(db);
        const group = transferDocs.slice(i, i + 450);

        group.forEach((transfer) => batch.delete(transfer.ref));

        await batch.commit();
      }

      await deleteDoc(
        doc(db, "bank", "royalbank", "customers", selectedId)
      );

      setSelectedId("");
      selectCustomer("");
      resetForm();

      alert(
        "Customer profile and demo transfer history deleted.\n\n" +
        "Please remove the customer's Firebase Authentication account separately through Firebase Console."
      );
    } catch (error) {
      console.error("Customer deletion error:", error);
      alert("Unable to complete customer deletion: " + error.message);
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
    WebkitTextFillColor: "#FFFFFF",
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

  const sectionStyle = {
    border: "1px solid rgba(212,175,55,0.3)",
    borderRadius: "10px",
    padding: "16px",
    marginTop: "22px",
    background: "#0B2542",
  };

  const sectionTitleStyle = {
    color: "#D4AF37",
    marginTop: 0,
    marginBottom: "18px",
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

      <Field label="Select Customer">
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
      </Field>

      <button type="button" onClick={newCustomer} style={buttonStyle}>
        + New Customer
      </button>

      <hr style={{ margin: "22px 0", borderColor: "#526477" }} />

      {/* PERSONAL INFORMATION */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>PERSONAL INFORMATION</h3>

        <Field label="Customer Full Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Gender">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </Field>

        <Field label="Email Address">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Phone Number">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234..."
            style={inputStyle}
          />
        </Field>

        <Field label="WhatsApp Number">
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+234..."
            style={inputStyle}
          />
        </Field>
      </div>

      {/* RESIDENTIAL ADDRESS */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>RESIDENTIAL ADDRESS</h3>

        <Field label="House Address">
          <textarea
            value={houseAddress}
            onChange={(e) => setHouseAddress(e.target.value)}
            placeholder="House number, street and area"
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Field>

        <Field label="City">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="State / Province">
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Country">
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Postal Code">
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            style={inputStyle}
          />
        </Field>
      </div>

      {/* CUSTOMER LOGIN */}
      {!selectedId && (
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>CUSTOMER LOGIN</h3>

          <Field label="Create Customer Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              style={inputStyle}
            />
          </Field>
        </div>
      )}

      {/* EXISTING PASSWORD MANAGER */}
      {selectedId && (
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>DEMO PASSWORD MANAGER</h3>

          <p style={{ fontSize: "13px", color: "#D5E2F0" }}>
            Demo reference only. This does not change the actual Firebase login password.
          </p>

          <Field label="Demo Password">
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
          </Field>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setShowDemoPassword(!showDemoPassword)}
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
            <p style={{ color: "#D4AF37" }}>
              Demo reference confirmed for this session.
            </p>
          )}

          <hr style={{ borderColor: "#526477", margin: "18px 0" }} />

          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={sendingReset}
            style={secondaryButtonStyle}
          >
            {sendingReset ? "Sending..." : "Send Actual Password Reset Email"}
          </button>
        </div>
      )}

      {/* ACCOUNT INFORMATION */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>ACCOUNT INFORMATION</h3>

        <Field label="Account Number">
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Sort Code">
          <input
            value={sortCode}
            onChange={(e) => setSortCode(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Account Type">
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            style={inputStyle}
          >
            <option>Personal Current Account</option>
            <option>Personal Savings Account</option>
            <option>Business Current Account</option>
            <option>Business Savings Account</option>
          </select>
        </Field>

        <Field label="Account Currency">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={inputStyle}
          >
            <option value="GBP">GBP - British Pound</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="NGN">NGN - Nigerian Naira</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </Field>

        <Field label="Balance (demo value)">
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Account Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option>Active</option>
            <option>Dormant</option>
            <option>Restricted</option>
          </select>
        </Field>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || sendingReset}
        style={{
          ...buttonStyle,
          width: "100%",
          marginTop: "22px",
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving
          ? "Processing..."
          : selectedId
          ? "Update Customer Profile"
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
