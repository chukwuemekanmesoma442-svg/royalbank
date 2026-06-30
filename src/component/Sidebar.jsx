import React from "react";

function Sidebar({ menuOpen, setMenuOpen, setPage }) {
  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? 0 : "-260px",
          width: "250px",
          height: "100vh",
          background: "#00205B",
          color: "#fff",
          transition: "0.3s",
          zIndex: 1000,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Royal Bank</h2>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
  onClick={() => {
    setPage("dashboard");
    setMenuOpen(false);
  }}
  style={{ cursor: "pointer" }}
>
   Dashboard
</div>

<div
  onClick={() => {
    setPage("transactions");
    setMenuOpen(false);
  }}
  style={{ cursor: "pointer" }}
>
   Transactions
</div>

<div
  onClick={() => {
    setPage("profile");
    setMenuOpen(false);
  }}
  style={{ cursor: "pointer" }}
>
  👤 Profile
</div>

<div
  onClick={() => {
    setPage("settings");
    setMenuOpen(false);
  }}
  style={{ cursor: "pointer" }}
>
   Settings
</div>

<div
  onClick={() => {
    setPage("support");
    setMenuOpen(false);
  }}
  style={{ cursor: "pointer" }}
>
   Customer Service
</div>

          <div
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "40px",
              color: "#FFD700",
              cursor: "pointer",
            }}
          >
            ✖ Close
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;