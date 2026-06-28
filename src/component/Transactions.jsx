function Transactions({ setPage }) {
  return (
    <div
      style={{
        background: "#071B36",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Transactions</h1>

      <button
        onClick={() => setPage("dashboard")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          background: "#0B3D91",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          color: "black",
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>18 Dec 2010</td>
            <td>Investment Portfolio Maturity</td>
            <td>Deposit</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              +£450,000.00
            </td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>27 Aug 2010</td>
            <td>Commercial Property Sale</td>
            <td>Deposit</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              +£320,000.00
            </td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>15 Mar 2009</td>
            <td>Business Profit Distribution</td>
            <td>Deposit</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              +£285,000.00
            </td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>09 Nov 2008</td>
            <td>Fixed Deposit Investment Released</td>
            <td>Deposit</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              +£215,000.00
            </td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>21 Jun 2007</td>
            <td>International Investment Transfer</td>
            <td>Deposit</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              +£350,000.00
            </td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;