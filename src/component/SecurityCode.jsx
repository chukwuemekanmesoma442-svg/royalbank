
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";

function SecurityCode({
  setPage,
  pendingTransfer,
  setCompletedTransfer,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const { bank, selectedCustomer, submitTransfer } =
    useContext(BankContext);

  const customerData = selectedCustomer || bank;
  const securityCode = customerData?.security?.code;

  const verifyCode = async () => {
    if (loading) return;

    if (!pendingTransfer) {
      alert("No pending transfer found.");
      setPage("transfer");
      return;
    }

    if (
      securityCode == null ||
      String(code).trim() !== String(securityCode)
    ) {
      alert(t("invalidSecurityCode"));
      return;
    }

    setLoading(true);

    try {
      const result = await submitTransfer(pendingTransfer);

      if (!result || !result.id) {
        throw new Error("Transfer record was not returned.");
      }

      setCompletedTransfer(result);
      setCode("");
      setPage("receipt");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Transfer could not be submitted. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "80px auto",
        padding: "30px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#082B6B" }}>
        {t("securityVerification")}
      </h2>

      <p>{t("enterSecurityCode")}</p>

      <p
        style={{
          fontSize: "13px",
          color: "#666",
          lineHeight: "1.6",
          marginTop: "10px",
        }}
      >
        {t("securityCodeHelp", {
          defaultValue:
            "To obtain your security code, please contact the bank through its official email address.",
        })}
      </p>

      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t("securityCode")}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "22px",
          textAlign: "center",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      />

      <button
        onClick={verifyCode}
        disabled={loading || !code.trim()}
        style={{
          marginTop: "25px",
          width: "100%",
          padding: "15px",
          background: "#082B6B",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading || !code.trim() ? 0.7 : 1,
        }}
      >
        {loading ? "Processing..." : t("verify")}
      </button>

      <button
        onClick={() => {
          if (!loading) {
            setCode("");
            setPage("transfer");
          }
        }}
        disabled={loading}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "13px",
          background: "white",
          color: "#082B6B",
          border: "1px solid #082B6B",
          borderRadius: "10px",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        ← Back to Transfer
      </button>
    </div>
  );
}

export default SecurityCode;
