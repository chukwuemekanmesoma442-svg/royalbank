import React from "react";

function Notifications({ setPage }) {
  const notifications = [
    {
      title: "Security Verification Required",
      message:
        "Complete your security verification to reactivate your account.",
    },
    {
      title: "Dormant Account Notice",
      message:
        "Your account remains dormant until verification is completed,please contact our customer support via gmail.",
    },
    {
      title: "Login Alert",
      message:
        "A successful login to your online banking account was detected.",
    },
    {
      title: "Welcome",
      message:
        "Thank you for banking with Royal Bank Online.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <button
        onClick={() => setPage("dashboard")}
        style={{
          background: "#005EB8",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginTop: "25px", color: "#00205B" }}>
        Notifications
      </h2>

      {notifications.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "18px",
            marginTop: "15px",
            borderRadius: "15px",
            boxShadow: "0 3px 10px rgba(0,0,0,.08)",
          }}
        >
          <h4 style={{ margin: 0 }}>{item.title}</h4>

          <p
            style={{
              marginTop: "8px",
              color: "#666",
              lineHeight: "1.5",
            }}
          >
            {item.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;