import React from "react";

function RecentTransactions() {
  const transactions = [
    {
      name: "Salary Credit",
      date: "18 Dec 2011",
      amount: "+£85,000.00",
      color: "#16a34a",
    },
    {
      name: "Council Tax",
      date: "15 Dec 2011",
      amount: "-£1,250.00",
      color: "#dc2626",
    },
    {
      name: "Electricity Bill",
      date: "10 Dec 2011",
      amount: "-£385.00",
      color: "#dc2626",
    },
    {
      name: "Investment Income",
      date: "05 Dec 2011",
      amount: "+£210,000.00",
      color: "#16a34a",
    },
  ];

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ marginBottom: "15px" }}>
        Recent Transactions
      </h3>

      {transactions.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 3px 12px rgba(0,0,0,.06)",
          }}
        >
          <div>
            <div style={{ fontWeight: "600" }}>
              {item.name}
            </div>

            <small style={{ color: "#777" }}>
              {item.date}
            </small>
          </div>

          <div
            style={{
              color: item.color,
              fontWeight: "bold",
            }}
          >
            {item.amount}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentTransactions;