import React from "react";

function DashboardWelcome() {
  const today = new Date();

  const date = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#00205B",
          fontSize: "26px",
          fontWeight: "700",
        }}
      >
        Good day, Kirsty Rehman 👋
      </h2>

      <p
        style={{
          color: "#666",
          marginTop: "8px",
          fontSize: "14px",
        }}
      >
        {date}
      </p>
    </div>
  );
}

export default DashboardWelcome;