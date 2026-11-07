
import React, { useState } from "react";
import { auth, db } from "../firebase";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AdminLogin({ setPage }) {
  const [complaint1, setComplaint1] = useState("");
  const [complaint2, setComplaint2] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState("");

  const [brandTaps, setBrandTaps] = useState(0);
  const [staffMode, setStaffMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Discreet staff access: click the bank heading five times.
  const handleBrandTap = () => {
    const nextCount = brandTaps + 1;

    if (nextCount >= 5) {
      setStaffMode(true);
      setBrandTaps(0);
      setLoginError("");
    } else {
      setBrandTaps(nextCount);
    }
  };

  // Submit a genuine customer complaint.
  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!complaint1.trim()) {
      setComplaintMessage("Please enter your complaint.");
      return;
    }

    setSubmitting(true);
    setComplaintMessage("");

    try {
      await addDoc(
        collection(db, "bank", "royalbank", "complaints"),
        {
          complaint1: complaint1.trim(),
          complaint2: complaint2.trim(),
          status: "new",
          createdAt: serverTimestamp(),
        }
      );

      setComplaint1("");
      setComplaint2("");

      setComplaintMessage(
        "Your complaint has been received successfully."
      );
    } catch (error) {
      console.error("Complaint submission error:", error);

      setComplaintMessage(
        "We could not submit your complaint. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
const handleForgotPassword = async () => {
  if (!email.trim()) {
    setLoginError("Please enter your admin email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.trim());

    setLoginError(
      "Password reset link sent. Please check your email."
    );
  } catch (error) {
    console.error("Password reset error:", error);

    setLoginError(
      "Could not send reset email. Please check the email address."
    );
  }
};

  // Authenticate authorized staff using Firebase.
  const handleStaffLogin = async (e) => {
    e.preventDefault();

    if (loggingIn) return;

    setLoggingIn(true);
    setLoginError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      setPage("admin");
    } catch (error) {
      console.error("Staff authentication error:", error);

      setLoginError(
        "Access could not be verified. Please check your details."
      );
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <header style={headerStyle}>
          <button
            type="button"
            onClick={handleBrandTap}
            style={brandStyle}
            aria-label="Royal Bank"
          >
            ROYAL BANK
          </button>

          <p style={subtitleStyle}>
            CUSTOMER SUPPORT
          </p>
        </header>

        {!staffMode ? (
          <>
            <div style={headingStyle}>
              <h2>Customer Complaints</h2>

              <p>
                We value your feedback. Please tell us about
                any concerns or difficulties you have
                experienced.
              </p>
            </div>

            <form onSubmit={submitComplaint}>
              <div style={formCardStyle}>
                <h3>Input Your Complaints Here</h3>

                <label style={labelStyle}>
                  Complaint 1
                </label>

                <textarea
                  value={complaint1}
                  onChange={(e) =>
                    setComplaint1(e.target.value)
                  }
                  placeholder="Describe your complaint..."
                  required
                  style={textareaStyle}
                />

                <label style={labelStyle}>
                  Complaint 2 (Optional)
                </label>

                <textarea
                  value={complaint2}
                  onChange={(e) =>
                    setComplaint2(e.target.value)
                  }
                  placeholder="Any additional concerns..."
                  style={textareaStyle}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  style={submitButtonStyle}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Complaint"}
                </button>

                {complaintMessage && (
                  <p style={messageStyle}>
                    {complaintMessage}
                  </p>
                )}
              </div>
            </form>
          </>
        ) : (
          <div style={formCardStyle}>
            <h2 style={{ color: "#082B6B" }}>
              Secure Access
            </h2>

            <p style={{ color: "#666" }}>
              Please verify your authorized staff credentials.
            </p>

            <form onSubmit={handleStaffLogin}>
              <label style={labelStyle}>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                autoComplete="username"
                required
                style={inputStyle}
              />

              <label style={labelStyle}>
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                style={inputStyle}
              />

              {loginError && (
                <p style={{ color: "#dc2626" }}>
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                style={submitButtonStyle}
              >
                {loggingIn ? "Verifying..." : "Continue"}
              </button>
            </form>
<button
  type="button"
  onClick={handleForgotPassword}
  style={{
    marginTop: "15px",
    background: "none",
    border: "none",
    color: "#082B6B",
    cursor: "pointer",
    width: "100%",
  }}
>
  Forgot Password?
</button>
            <button
              type="button"
              onClick={() => {
                setStaffMode(false);
                setEmail("");
                setPassword("");
                setLoginError("");
              }}
              style={backButtonStyle}
            >
              ← Return to Complaints
            </button>
          </div>
        )}

        <footer style={footerStyle}>
          Royal Bank © 2026. All rights reserved.
        </footer>

      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f3f5f9",
  padding: "30px 16px",
  fontFamily: "Arial, sans-serif",
};

const containerStyle = {
  maxWidth: "480px",
  margin: "0 auto",
};

const headerStyle = {
  background: "#082B6B",
  padding: "25px",
  borderRadius: "14px",
  textAlign: "center",
  color: "white",
  marginBottom: "25px",
};

const brandStyle = {
  background: "transparent",
  color: "#D4AF37",
  border: "none",
  fontSize: "27px",
  fontWeight: "bold",
  letterSpacing: "2px",
  cursor: "pointer",
};

const subtitleStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  marginBottom: 0,
};

const headingStyle = {
  textAlign: "center",
  color: "#082B6B",
  marginBottom: "22px",
};

const formCardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
};

const labelStyle = {
  display: "block",
  marginTop: "18px",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#26364b",
};

const textareaStyle = {
  width: "100%",
  minHeight: "115px",
  padding: "13px",
  border: "1px solid #d5dbe5",
  borderRadius: "9px",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
  resize: "vertical",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  border: "1px solid #d5dbe5",
  borderRadius: "9px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const submitButtonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "22px",
  background: "#082B6B",
  color: "white",
  border: "none",
  borderRadius: "9px",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
};

const backButtonStyle = {
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  background: "white",
  color: "#082B6B",
  border: "1px solid #082B6B",
  borderRadius: "9px",
  cursor: "pointer",
};

const messageStyle = {
  textAlign: "center",
  color: "#166534",
  fontSize: "14px",
  marginTop: "15px",
};

const footerStyle = {
  textAlign: "center",
  fontSize: "12px",
  color: "#777",
  marginTop: "25px",
};

export default AdminLogin;
