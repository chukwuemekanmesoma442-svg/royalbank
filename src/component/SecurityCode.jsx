
import React, { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";

function SecurityCode({
  setPage,
  pendingTransfer,
  setCompletedTransfer,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (loading) return;

    const uid = auth.currentUser?.uid;

    if (!uid) {
      setError("Please sign in again before submitting.");
      return;
    }

    if (!pendingTransfer) {
      setError("Transfer details are missing. Please start again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const transferData = {
        recipientName: String(pendingTransfer.recipientName || "").trim(),
        recipientAddress: String(pendingTransfer.recipientAddress || "").trim(),
        recipientCountry: String(pendingTransfer.recipientCountry || "").trim(),
        bankName: String(pendingTransfer.bankName || "").trim(),
        bankAddress: String(pendingTransfer.bankAddress || "").trim(),
        accountNumber: String(pendingTransfer.accountNumber || "").trim(),
        iban: String(pendingTransfer.iban || "").trim().toUpperCase(),
        swiftBic: String(pendingTransfer.swiftBic || "").trim().toUpperCase(),
        sortCode: String(pendingTransfer.sortCode || "").trim(),
        amount: String(pendingTransfer.amount || "").trim(),
        currency: String(pendingTransfer.currency || "GBP").trim(),
        accountType: String(pendingTransfer.accountType || "").trim(),
        paymentReference: String(pendingTransfer.paymentReference || "").trim(),
        customerId: uid,
        status: "pending",
        demo: true,
        createdAt: serverTimestamp(),
      };

      const transferRef = await addDoc(
        collection(db, "bank", "royalbank", "transfers"),
        transferData
      );

      setCompletedTransfer({
        ...transferData,
        id: transferRef.id,
        createdAt: new Date().toISOString(),
      });

      setPage("receipt");
    } catch (err) {
      console.error("Demo transfer submission error:", err);

      if (err.code === "permission-denied") {
        setError("Permission denied. Please check your Firestore rules.");
      } else {
        setError("Transfer submission failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#071B36",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
        background: "#fff",
        borderRadius: "16px",
        padding: "28px 22px",
        color: "#1f2937",
        boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#071B36",
          marginTop: 0,
        }}>
          Confirm Transfer
        </h2>

        <p style={{ textAlign: "center", lineHeight: 1.6 }}>
          Please confirm that you want to submit this transfer request.
        </p>

        <div style={{
          background: "#fff4e5",
          border: "1px solid #ffd591",
          borderRadius: "10px",
          padding: "13px",
          margin: "18px 0",
          lineHeight: 1.5,
          fontSize: "14px",
        }}>
          <strong>notice:</strong> this confirms that you've submitted a transfer , if it fails to succeed please contact the bank
        </div>

        {error && (
          <p style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "14px",
          }}>
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#9ca3af" : "#D4AF37",
            color: "#071B36",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "submit transfer"}
        </button>

        <button
          type="button"
          onClick={() => setPage("transfer")}
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "10px",
            background: "transparent",
            color: "#071B36",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default SecurityCode;
