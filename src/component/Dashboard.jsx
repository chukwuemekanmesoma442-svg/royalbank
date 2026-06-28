import React from "react";
import logo from "../assets/logo.png";

function Dashboard({ setPage }) {
  return (
    <div
  style={{
    display: window.innerWidth < 768 ? "block" : "flex",
    flexDirection: window.innerWidth < 768 ? "column" : "row",
    minHeight: "100vh",
    background: "#F5F7FB",
    fontFamily: "Arial, sans-serif",
  }}
>
      {/* Sidebar */}

      <div
  style={{
    width: window.innerWidth < 768 ? "100%" : "300px",
    background: "#082B6B",
    color: "white",
    padding: window.innerWidth < 768 ? "20px" : "30px",
    boxSizing: "border-box",
  }}
>
<img
  src={logo}
  alt="Royal Bank"
  style={{
    width: "240px",
    display: "block",
    margin: "0 auto",
  }}
/>
<hr
  style={{
    margin: "30px 0",
    border: "1px solid rgba(255,255,255,0.2)",
  }}
/>

<p
  onClick={() => setPage("dashboard")}
  style={{
    cursor: "pointer",
    fontWeight: "bold",
    background: "#0B3D91",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "12px",
  }}
>
  🏠 Dashboard
</p>

<p
  style={{
    cursor: "pointer",
    padding: "12px 14px",
    marginBottom: "8px",
  }}
></p>

<p
  onClick={() => setPage("transfer")}
  style={{ cursor: "pointer" }}
>
  💸 Transfer
</p>

<p
  style={{
    cursor: "pointer",
    padding: "12px 14px",
    marginBottom: "8px",
  }}
></p>
<p
  style={{
    cursor: "pointer",
    padding: "12px 14px",
    marginBottom: "8px",
  }}
></p>

<p
  style={{
    cursor: "pointer",
    padding: "12px 14px",
    marginBottom: "8px",
  }}
></p>

<p
  onClick={() => setPage("transactions")}
  style={{
  cursor: "pointer",
  padding: "12px 14px",
  marginBottom: "8px",
}}
>
  📜 Transactions
</p>

<p
  onClick={() => setPage("profile")}
 style={{
  cursor: "pointer",
  padding: "12px 14px",
  marginBottom: "8px",
}}
>
  👤 Profile
</p>

<p
  onClick={() => setPage("settings")}
  style={{
  cursor: "pointer",
  padding: "12px 14px",
  marginBottom: "8px",
}}
>
  ⚙️ Settings
</p>
      </div>
      <p
  onClick={() => setPage("login")}
  style={{
    cursor: "pointer",
    padding: "12px 14px",
    marginTop: "40px",
    color: "#e10b0b",
    fontWeight: "bold",
  }}
>
  🚪 Logout
</p>

      {/* Main Content */}

      <div
        style={{
          flex: 1,
         padding: window.innerWidth < 768 ? "20px" : "40px",
        }}
      >
{/* Top Bar */}

<div
  style={{
    display: "flex",
flexDirection: window.innerWidth < 768 ? "column" : "row",
justifyContent: "space-between",
alignItems: window.innerWidth < 768 ? "stretch" : "center",
gap: "20px",
marginBottom: "40px",
  }}
>
  <input
    type="text"
    placeholder="Search..."
    style={{
      width: window.innerWidth < 768 ? "100%" : "450px",
      padding: "14px 20px",
      borderRadius: "30px",
      border: "none",
      background: "#ECECEC",
      outline: "none",
      fontSize: "15px",
    }}
  />

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
    }}
  >
    <div
      style={{
        position: "relative",
        fontSize: window.innerWidth < 768 ? "22px" : "28px",
      }}
    >
      🔔

      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-8px",
          background: "#0B3D91",
          color: "white",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        3
      </span>
    </div>

    <div
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        background: "#D4AF37",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        color: "#082B6B",
      }}
    >
      KR
    </div>
  </div>
</div>

<h1
 style={{
  color: "#082B6B",
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "8px",
}}
>
  Welcome back, Kirsty Rehman
</h1>

<p
  style={{
    color: "#666",
    fontSize: "16px",
  }}
>
  start easy banking.
</p>
<div
  style={{
    display: "grid",
gridTemplateColumns:
  window.innerWidth < 768
    ? "1fr"
    : window.innerWidth < 1024
    ? "repeat(2, 1fr)"
    : "repeat(4, 1fr)",
gap: "20px",
    marginTop: "40px",
  }}
>
<div
  style={{
    background: "#0B3D91",
    color: "white",
    borderRadius: "18px",
    padding: "30px",
    gridColumn: "span 2",
  }}
>
  <h3 style={{ margin: 0 }}>Available Balance</h3>

  <h1
    style={{
      marginTop: "20px",
      fontSize: window.innerWidth < 768 ? "28px" : "40px",
    }}
  >
    £1,600,900.00
  </h1>

  <p
    style={{
      opacity: 0.8,
      marginTop: "15px",
    }}
  >
    Current Account
  </p>
</div>
  <div
  style={{
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    gridColumn: "span 2",
  }}
>
  <h3>Quick Actions</h3>

  <div
    style={{
      display: "grid",
     gridTemplateColumns:
  window.innerWidth < 768
    ? "1fr"
    : "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "20px",
      textAlign: "center",
    }}
  >
    <div>💸<br />Transfer</div>
    <div>💰<br />Deposit</div>
    <div>💳<br />Pay Bills</div>
    <div>📄<br />Statement</div>
  </div>

  </div>

  
    

  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "18px",
      boxShadow: "0 5px 20px rgba(0,0,0,.08)",
    }}
  >
    <p>Status</p>

    <h2 style={{ color: "orange" }}>
      🟠 Dormant
    </h2>

    <small>Account Status</small>
  </div>

  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "18px",
      boxShadow: "0 5px 20px rgba(0,0,0,.08)",
    }}
  >
    <p>Last Login</p>

    <h2>Today</h2>

    <small>now </small>
  </div>
<div
  style={{
    background: "white",
    marginTop: "35px",
    gridColumn: "span 4",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  }}
>
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2 style={{ color: "#082B6B", margin: 0 }}>
    Recent Transactions
  </h2>

  <button
    style={{
      background: "#082B6B",
      color: "white",
      border: "none",
      padding: "8px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    View All
  </button>
</div>

  <div>
   

   <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #eee",
  }}
>
  <div>
    <strong style={{ color: "#082B6B" }}>
  International Wire Deposit
</strong>
    <br />
    <small>15 Mar 2011</small>
  </div>

  <strong style={{ color: "green" }}>
    +£575,000.00
  </strong>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #eee",
  }}
>
  <div>
    <strong style={{ color: "#082B6B" }}>
  International Wire Deposit
</strong>
    <br />
    <small>04 Jul 2011</small>
  </div>

  <strong style={{ color: "green" }}>
    +£420,000.00
  </strong>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
  }}
>
  <div>
    <strong style={{ color: "#082B6B" }}>
  International Wire Deposit
</strong>
    <br />
    <small>18 Nov 2011</small>
  </div>

  <strong style={{ color: "green" }}>
    +£605,900.00
  </strong>
</div>
  </div>
</div>

</div>
</div>
</div>
  );
}

export default Dashboard;