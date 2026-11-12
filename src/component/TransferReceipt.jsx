
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BankContext } from "../context/BankContext";
import logo from "../assets/logo.png";

function TransferReceipt({ transfer, setPage }) {
  const { t } = useTranslation();
  const { bank } = useContext(BankContext);

  const tr = (key, fallback) =>
    t(`transferReceipt.${key}`, { defaultValue: fallback });

  const allowedCurrencies = ["GBP", "USD", "EUR", "CAD", "AUD"];

  const savedCurrency =
    transfer?.currency ||
    bank?.customer?.currency ||
    "GBP";

  const currency = allowedCurrencies.includes(
    String(savedCurrency).toUpperCase()
  )
    ? String(savedCurrency).toUpperCase()
    : "GBP";

  const formatAmount = (amount) => {
    const numericAmount = Number(
      String(amount ?? "0")
        .replace(/,/g, "")
        .replace(/[^0-9.-]/g, "")
    );

    if (!Number.isFinite(numericAmount)) return "—";

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  };

  const formatDate = (value) => {
    if (!value) return tr("awaitingTimestamp", "Awaiting timestamp");

    const date = value?.toDate
      ? value.toDate()
      : new Date(value);

    if (isNaN(date.getTime())) {
      return tr("awaitingTimestamp", "Awaiting timestamp");
    }

    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!transfer) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.emptyCard}>
          <h2>{tr("noReceipt", "No transfer receipt available")}</h2>
          <p>{tr("returnToDashboard", "Please return to your dashboard.")}</p>
          <button
            style={styles.primaryButton}
            onClick={() => setPage("dashboard")}
          >
            {tr("backDashboard", "Back to Dashboard")}
          </button>
        </div>
      </div>
    );
  }

  const currentStatus = String(
    transfer.status || "pending"
  ).toLowerCase();

  const statusSettings = {
    pending: {
      label: tr("pending", "PENDING"),
      color: "#946200",
      background: "#fff3cd",
      symbol: "◷",
    },
    successful: {
      label: tr("successful", "SUCCESSFUL"),
      color: "#15803d",
      background: "#dcfce7",
      symbol: "✓",
    },
    failed: {
      label: tr("failed", "FAILED"),
      color: "#b91c1c",
      background: "#fee2e2",
      symbol: "!",
    },
  };

  const status =
    statusSettings[currentStatus] || statusSettings.pending;

  const details = [
    ["recipientName", "Recipient Name", transfer.recipientName],
    ["recipientAddress", "Recipient Address", transfer.recipientAddress],
    ["recipientCountry", "Recipient Country", transfer.recipientCountry],
    ["receivingBank", "Receiving Bank", transfer.bankName],
    ["bankAddress", "Bank Address", transfer.bankAddress],
    ["accountNumber", "Account Number", transfer.accountNumber],
    ["iban", "IBAN", transfer.iban],
    ["swiftBic", "SWIFT / BIC", transfer.swiftBic],
    ["sortCode", "Sort Code", transfer.sortCode],
    ["accountType", "Account Type", transfer.accountType],
    ["paymentReference", "Payment Reference", transfer.paymentReference],
    ["transactionId", "Transaction ID", transfer.id],
    ["transactionDate", "Transaction Date", formatDate(transfer.createdAt)],
  ].filter(([, , value]) => value);

  return (
    <div style={styles.page}>
      <div className="receipt-card" style={styles.receipt}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.brand}>
            <img
              src={logo}
              alt="Royal Bank Logo"
              style={styles.logo}
            />

            <div>
              <h2 style={styles.brandName}>ROYAL BANK</h2>
              <p style={styles.brandSubtitle}>
                {tr("digitalBanking", "DIGITAL BANKING")}
              </p>
            </div>
          </div>

          <div style={styles.receiptLabel}>
            {tr("transfer", "TRANSFER")}
            <br />
            {tr("receipt", "RECEIPT")}
          </div>
        </div>

        <div style={styles.goldLine} />

        {/* INTRODUCTION */}
        <div style={styles.intro}>
          <div style={styles.receiptIcon}>↗</div>

          <h2 style={styles.title}>
            {tr("transferDetails", "Transfer Details")}
          </h2>

          <p style={styles.subtitle}>
            {tr(
              "receiptSubtitle",
              "Your transfer submission details are shown below."
            )}
          </p>
        </div>

        {/* AMOUNT */}
        <div style={styles.amountCard}>
          <p style={styles.amountLabel}>
            {tr("transferAmount", "TRANSFER AMOUNT")}
          </p>

          <h1 style={styles.amount}>
            {formatAmount(transfer.amount)}
          </h1>

          <div
            style={{
              ...styles.statusBadge,
              background: status.background,
              color: status.color,
            }}
          >
            <span>{status.symbol}</span>
            {status.label}
          </div>
        </div>

        {/* BENEFICIARY */}
        <div style={styles.recipientCard}>
          <div style={styles.recipientIcon}>
            {String(transfer.recipientName || "R")
              .trim()
              .charAt(0)
              .toUpperCase()}
          </div>

          <div style={{ minWidth: 0 }}>
            <p style={styles.smallLabel}>
              {tr("transferTo", "TRANSFER TO")}
            </p>

            <h3 style={styles.recipientName}>
              {transfer.recipientName || tr("recipient", "Recipient")}
            </h3>

            <p style={styles.bankName}>
              {transfer.bankName || tr("receivingBank", "Receiving Bank")}
            </p>
          </div>
        </div>

        {/* TRANSACTION DETAILS */}
        <div style={styles.detailsSection}>
          <div style={styles.sectionHeading}>
            <span>
              {tr("transactionInformation", "TRANSACTION INFORMATION")}
            </span>
            <div style={styles.headingLine} />
          </div>

          {details.map(([key, fallback, value], index) => (
            <div
              key={key}
              style={{
                ...styles.detailRow,
                borderBottom:
                  index === details.length - 1
                    ? "none"
                    : "1px solid #edf0f4",
              }}
            >
              <span style={styles.detailLabel}>
                {tr(key, fallback)}
              </span>

              <strong style={styles.detailValue}>
                {String(value)}
              </strong>
            </div>
          ))}
        </div>

       

        {/* ACTION BUTTONS */}
        <div className="no-print" style={styles.actions}>
          <button
            onClick={() => window.print()}
            style={styles.printButton}
          >
            ↗ &nbsp; {tr("printReceipt", "Print Receipt")}
          </button>

          <button
            onClick={() => setPage("dashboard")}
            style={styles.primaryButton}
          >
            ← &nbsp; {tr("backDashboard", "Back to Dashboard")}
          </button>
        </div>
      </div>

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          @media (max-width: 480px) {
            .receipt-card {
              padding: 20px 15px !important;
            }
          }

          @media print {
            body {
              background: white !important;
            }

            .no-print {
              display: none !important;
            }

            .receipt-card {
              box-shadow: none !important;
              margin: 0 auto !important;
              max-width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#edf1f7",
    padding: "30px 14px",
    fontFamily: "Arial, sans-serif",
  },
  receipt: {
    maxWidth: "540px",
    width: "100%",
    margin: "0 auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 40px rgba(7, 27, 54, 0.12)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },
  logo: {
    width: "65px",
    height: "65px",
    objectFit: "contain",
  },
  brandName: {
    color: "#082B6B",
    fontSize: "19px",
    margin: 0,
    fontWeight: "900",
    letterSpacing: "1px",
  },
  brandSubtitle: {
    color: "#a88746",
    fontSize: "9px",
    letterSpacing: "3px",
    fontWeight: "bold",
    margin: "5px 0 0",
  },
  receiptLabel: {
    color: "#a88746",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textAlign: "right",
    lineHeight: "1.7",
  },
  goldLine: {
    height: "3px",
    background: "linear-gradient(90deg, #b28b43, #f1d58b, #b28b43)",
    marginTop: "22px",
    borderRadius: "5px",
  },
  intro: {
    textAlign: "center",
    padding: "28px 0 18px",
  },
  receiptIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#edf3fb",
    color: "#082B6B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "27px",
    margin: "0 auto 12px",
  },
  title: {
    color: "#082B6B",
    fontSize: "22px",
    margin: "0 0 7px",
  },
  subtitle: {
    color: "#8490a1",
    fontSize: "12px",
    margin: 0,
    lineHeight: "1.5",
  },
  amountCard: {
    background: "linear-gradient(140deg, #061a38, #0d3674)",
    padding: "26px 15px",
    borderRadius: "15px",
    textAlign: "center",
    marginTop: "12px",
  },
  amountLabel: {
    color: "#c9d5e7",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "bold",
    margin: "0 0 12px",
  },
  amount: {
    color: "#ffffff",
    fontSize: "32px",
    margin: "0 0 18px",
    overflowWrap: "anywhere",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "8px 18px",
    borderRadius: "30px",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
  recipientCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "20px 0",
    borderBottom: "1px solid #e9edf3",
  },
  recipientIcon: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "50%",
    background: "#e8eff9",
    color: "#082B6B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  smallLabel: {
    color: "#9aa4b2",
    fontSize: "10px",
    letterSpacing: "1.5px",
    margin: "0 0 5px",
  },
  recipientName: {
    color: "#082B6B",
    fontSize: "16px",
    margin: 0,
    overflowWrap: "anywhere",
  },
  bankName: {
    color: "#7c8797",
    fontSize: "12px",
    margin: "5px 0 0",
  },
  detailsSection: {
    marginTop: "25px",
  },
  sectionHeading: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#a88746",
    fontSize: "10px",
    letterSpacing: "1.5px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  headingLine: {
    height: "1px",
    background: "#e8eaf0",
    flex: 1,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    padding: "14px 0",
  },
  detailLabel: {
    color: "#8993a2",
    fontSize: "12px",
    flex: "0 0 40%",
  },
  detailValue: {
    color: "#18345d",
    fontSize: "12px",
    textAlign: "right",
    overflowWrap: "anywhere",
    maxWidth: "60%",
  },
  notice: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    background: "#f3f6fa",
    borderRadius: "10px",
    padding: "13px",
    marginTop: "22px",
  },
  noticeIcon: {
    color: "#a88746",
    fontSize: "18px",
  },
  noticeText: {
    color: "#596579",
    fontSize: "11px",
    lineHeight: "1.6",
    margin: 0,
  },
  footer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#082B6B",
  },
  footerLine: {
    height: "1px",
    background: "#e9edf3",
    marginBottom: "17px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "11px",
    marginTop: "25px",
  },
  printButton: {
    width: "100%",
    padding: "14px",
    background: "#ffffff",
    color: "#082B6B",
    border: "1px solid #d8e0eb",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  primaryButton: {
    width: "100%",
    padding: "15px",
    background: "#082B6B",
    color: "#ffffff",
    border: "none",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  emptyPage: {
    minHeight: "100vh",
    background: "#edf1f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  emptyCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
};

export default TransferReceipt;
