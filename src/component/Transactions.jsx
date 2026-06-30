import React from "react";

function Transactions({ setPage }) {
  const transactions = [
    {
      date: "18 Dec 2011",
      description: "Salary Credit",
      amount: "+£85,000.00",
      balance: "£1,600,900.00",
      color: "#16a34a",
    },
    {
      date: "15 Dec 2011",
      description: "Council Tax",
      amount: "-£1,250.00",
      balance: "£1,515,900.00",
      color: "#dc2626",
    },
    {
      date: "10 Dec 2011",
      description: "Electricity Bill",
      amount: "-£385.00",
      balance: "£1,517,150.00",
      color: "#dc2626",
    },
    {
      date: "05 Dec 2011",
      description: "Investment Income",
      amount: "+£210,000.00",
      balance: "£1,517,535.00",
      color: "#16a34a",
    },
    {
      date: "28 Nov 2011",
      description: "Property Rental",
      amount: "+£14,500.00",
      balance: "£1,307,535.00",
      color: "#16a34a",
    },
    {
      date: "21 Nov 2011",
      description: "British Gas",
      amount: "-£240.00",
      balance: "£1,293,035.00",
      color: "#dc2626",
    },
    {
      date: "16 Nov 2011",
      description: "Tesco Supermarket",
      amount: "-£188.75",
      balance: "£1,293,275.00",
      color: "#dc2626",
    },
    {
      date: "09 Nov 2011",
      description: "Business Income",
      amount: "+£120,000.00",
      balance: "£1,293,463.75",
      color: "#16a34a",
    },
    {
  date: "30 Nov 2011",
  description: "ATM Cash Withdrawal",
  amount: "-£200.00",
  balance: "£1,307,535.00",
  color: "#dc2626",
},
{
  date: "22 Nov 2011",
  description: "Interest Credit",
  amount: "+£2,450.00",
  balance: "£1,307,735.00",
  color: "#16a34a",
},
{
  date: "14 Nov 2011",
  description: "British Gas",
  amount: "-£185.00",
  balance: "£1,305,285.00",
  color: "#dc2626",
},
{
  date: "01 Nov 2011",
  description: "Investment Income",
  amount: "+£65,000.00",
  balance: "£1,305,470.00",
  color: "#16a34a",
},
{
  date: "02 Nov 2011",
  description: "Mortgage Payment",
  amount: "-£2,450.00",
  balance: "£1,173,463.75",
  color: "#dc2626",
},
{
  date: "25 Oct 2011",
  description: "Dividend Payment",
  amount: "+£48,000.00",
  balance: "£1,175,913.75",
  color: "#16a34a",
},
{
  date: "18 Oct 2011",
  description: "Fuel Purchase",
  amount: "-£96.20",
  balance: "£1,127,913.75",
  color: "#dc2626",
},
{
  date: "10 Oct 2011",
  description: "ATM Cash Withdrawal",
  amount: "-£500.00",
  balance: "£1,128,009.95",
  color: "#dc2626",
},
{
  date: "28 Sep 2011",
  description: "Property Rental",
  amount: "+£18,500.00",
  balance: "£1,128,509.95",
  color: "#16a34a",
},
{
  date: "15 Sep 2011",
  description: "British Gas",
  amount: "-£315.00",
  balance: "£1,110,009.95",
  color: "#dc2626",
},
{
  date: "03 Sep 2011",
  description: "Interest Credit",
  amount: "+£2,950.00",
  balance: "£1,110,324.95",
  color: "#16a34a",
},
{
  date: "22 Aug 2011",
  description: "Tesco Supermarket",
  amount: "-£245.35",
  balance: "£1,107,374.95",
  color: "#dc2626",
},
{
  date: "12 Aug 2011",
  description: "Salary Credit",
  amount: "+£82,000.00",
  balance: "£1,107,620.30",
  color: "#16a34a",
},
{
  date: "30 Jul 2011",
  description: "Council Tax",
  amount: "-£1,100.00",
  balance: "£1,025,620.30",
  color: "#dc2626",
},
{
  date: "15 Jul 2011",
  description: "Investment Return",
  amount: "+£150,000.00",
  balance: "£1,026,720.30",
  color: "#16a34a",
},
{
  date: "28 Jun 2011",
  description: "Car Insurance",
  amount: "-£895.00",
  balance: "£876,720.30",
  color: "#dc2626",
},
{
  date: "14 Jun 2011",
  description: "Business Income",
  amount: "+£95,000.00",
  balance: "£877,615.30",
  color: "#16a34a",
},
{
  date: "29 May 2011",
  description: "Water Bill",
  amount: "-£180.00",
  balance: "£782,615.30",
  color: "#dc2626",
},
{
  date: "10 May 2011",
  description: "Salary Credit",
  amount: "+£82,000.00",
  balance: "£782,795.30",
  color: "#16a34a",
},
{
  date: "21 Apr 2010",
  description: "Investment Income",
  amount: "+£120,000.00",
  balance: "£700,795.30",
  color: "#16a34a",
},
{
  date: "18 Mar 2010",
  description: "Mortgage Payment",
  amount: "-£2,450.00",
  balance: "£580,795.30",
  color: "#dc2626",
},
{
  date: "11 Feb 2010",
  description: "Salary Credit",
  amount: "+£79,500.00",
  balance: "£583,245.30",
  color: "#16a34a",
},
{
  date: "20 Nov 2009",
  description: "Business Income",
  amount: "+£110,000.00",
  balance: "£503,745.30",
  color: "#16a34a",
},
{
  date: "04 Aug 2009",
  description: "Property Rental",
  amount: "+£14,500.00",
  balance: "£393,745.30",
  color: "#16a34a",
},
{
  date: "17 May 2009",
  description: "Council Tax",
  amount: "-£980.00",
  balance: "£379,245.30",
  color: "#dc2626",
},
{
  date: "02 Feb 2009",
  description: "Salary Credit",
  amount: "+£75,000.00",
  balance: "£380,225.30",
  color: "#16a34a",
},
{
  date: "18 Dec 2008",
  description: "Year-End Bonus",
  amount: "+£95,000.00",
  balance: "£305,225.30",
  color: "#16a34a",
},
{
  date: "27 Nov 2008",
  description: "Investment Dividend",
  amount: "+£42,500.00",
  balance: "£210,225.30",
  color: "#16a34a",
},
{
  date: "15 Oct 2008",
  description: "Mortgage Payment",
  amount: "-£2,450.00",
  balance: "£167,725.30",
  color: "#dc2626",
},
{
  date: "02 Sep 2008",
  description: "Salary Credit",
  amount: "+£72,000.00",
  balance: "£170,175.30",
  color: "#16a34a",
},
{
  date: "12 Jul 2008",
  description: "Tesco Supermarket",
  amount: "-£210.60",
  balance: "£98,175.30",
  color: "#dc2626",
},
{
  date: "20 May 2008",
  description: "Business Income",
  amount: "+£88,000.00",
  balance: "£98,385.90",
  color: "#16a34a",
},
{
  date: "04 Apr 2008",
  description: "Electricity Bill",
  amount: "-£420.00",
  balance: "£10,385.90",
  color: "#dc2626",
},
{
  date: "18 Feb 2008",
  description: "Property Rental",
  amount: "+£15,500.00",
  balance: "£10,805.90",
  color: "#16a34a",
},
{
  date: "21 Dec 2007",
  description: "Salary Credit",
  amount: "+£68,000.00",
  balance: "£-4,694.10",
  color: "#16a34a",
},
{
  date: "14 Nov 2007",
  description: "British Gas",
  amount: "-£275.00",
  balance: "£-72,694.10",
  color: "#dc2626",
},
{
  date: "30 Sep 2007",
  description: "Investment Return",
  amount: "+£54,000.00",
  balance: "£-72,419.10",
  color: "#16a34a",
},
{
  date: "19 Aug 2007",
  description: "Council Tax",
  amount: "-£950.00",
  balance: "£-126,419.10",
  color: "#dc2626",
},
{
  date: "05 Jul 2007",
  description: "Business Income",
  amount: "+£83,000.00",
  balance: "£-125,469.10",
  color: "#16a34a",
},
{
  date: "11 May 2007",
  description: "Car Insurance",
  amount: "-£820.00",
  balance: "£-208,469.10",
  color: "#dc2626",
},
{
  date: "27 Mar 2007",
  description: "Salary Credit",
  amount: "+£65,000.00",
  balance: "£-207,649.10",
  color: "#16a34a",
},
{
  date: "15 Dec 2006",
  description: "Property Sale",
  amount: "+£240,000.00",
  balance: "£-272,649.10",
  color: "#16a34a",
},
{
  date: "08 Oct 2006",
  description: "Fuel Purchase",
  amount: "-£135.40",
  balance: "£-512,649.10",
  color: "#dc2626",
},
{
  date: "29 Aug 2006",
  description: "Salary Credit",
  amount: "+£62,500.00",
  balance: "£-512,513.70",
  color: "#16a34a",
},
{
  date: "13 Jun 2006",
  description: "Mortgage Payment",
  amount: "-£2,300.00",
  balance: "£-575,013.70",
  color: "#dc2626",
},
{
  date: "25 Feb 2006",
  description: "Business Income",
  amount: "+£77,000.00",
  balance: "£-572,713.70",
  color: "#16a34a",
},
{
  date: "18 Nov 2005",
  description: "Salary Credit",
  amount: "+£60,000.00",
  balance: "£-649,713.70",
  color: "#16a34a",
},
{
  date: "04 Oct 2005",
  description: "Mortgage Payment",
  amount: "-£2,250.00",
  balance: "£-709,713.70",
  color: "#dc2626",
},
{
  date: "16 Aug 2005",
  description: "Business Income",
  amount: "+£74,000.00",
  balance: "£-707,463.70",
  color: "#16a34a",
},
{
  date: "27 Jun 2005",
  description: "Council Tax",
  amount: "-£900.00",
  balance: "£-781,463.70",
  color: "#dc2626",
},
{
  date: "12 Apr 2005",
  description: "Investment Return",
  amount: "+£95,000.00",
  balance: "£-780,563.70",
  color: "#16a34a",
},
{
  date: "21 Dec 2004",
  description: "Property Purchase",
  amount: "-£250,000.00",
  balance: "£-875,563.70",
  color: "#dc2626",
},
{
  date: "10 Nov 2004",
  description: "Salary Credit",
  amount: "+£58,000.00",
  balance: "£-625,563.70",
  color: "#16a34a",
},
{
  date: "05 Sep 2004",
  description: "Dividend Payment",
  amount: "+£36,000.00",
  balance: "£-683,563.70",
  color: "#16a34a",
},
{
  date: "17 Jul 2004",
  description: "British Gas",
  amount: "-£290.00",
  balance: "£-719,563.70",
  color: "#dc2626",
},
{
  date: "02 May 2004",
  description: "Business Income",
  amount: "+£81,000.00",
  balance: "£-719,273.70",
  color: "#16a34a",
},
{
  date: "14 Dec 2003",
  description: "Salary Credit",
  amount: "+£56,000.00",
  balance: "£-800,273.70",
  color: "#16a34a",
},
{
  date: "28 Oct 2003",
  description: "Vehicle Purchase",
  amount: "-£28,500.00",
  balance: "£-856,273.70",
  color: "#dc2626",
},
{
  date: "18 Aug 2003",
  description: "Property Rental",
  amount: "+£13,000.00",
  balance: "£-827,773.70",
  color: "#16a34a",
},
{
  date: "30 Jun 2003",
  description: "Mortgage Payment",
  amount: "-£2,100.00",
  balance: "£-840,773.70",
  color: "#dc2626",
},
{
  date: "12 Apr 2003",
  description: "Business Income",
  amount: "+£68,000.00",
  balance: "£-838,673.70",
  color: "#16a34a",
},
{
  date: "19 Dec 2002",
  description: "Salary Credit",
  amount: "+£54,000.00",
  balance: "£-906,673.70",
  color: "#16a34a",
},
{
  date: "08 Oct 2002",
  description: "Investment Income",
  amount: "+£72,000.00",
  balance: "£-960,673.70",
  color: "#16a34a",
},
{
  date: "25 Aug 2002",
  description: "Electricity Bill",
  amount: "-£240.00",
  balance: "£-1,032,673.70",
  color: "#dc2626",
},
{
  date: "10 Jun 2002",
  description: "Council Tax",
  amount: "-£840.00",
  balance: "£-1,032,433.70",
  color: "#dc2626",
},
{
  date: "01 Apr 2002",
  description: "Business Income",
  amount: "+£63,000.00",
  balance: "£-1,031,593.70",
  color: "#16a34a",
},
{
  date: "14 Dec 2001",
  description: "Salary Credit",
  amount: "+£50,000.00",
  balance: "£-1,094,593.70",
  color: "#16a34a",
},
{
  date: "28 Oct 2001",
  description: "House Renovation",
  amount: "-£18,000.00",
  balance: "£-1,144,593.70",
  color: "#dc2626",
},
{
  date: "15 Aug 2001",
  description: "Interest Credit",
  amount: "+£5,200.00",
  balance: "£-1,126,593.70",
  color: "#16a34a",
},
{
  date: "30 Jun 2001",
  description: "Salary Credit",
  amount: "+£48,000.00",
  balance: "£-1,131,793.70",
  color: "#16a34a",
},
{
  date: "18 Apr 2001",
  description: "Mortgage Payment",
  amount: "-£2,000.00",
  balance: "£-1,179,793.70",
  color: "#dc2626",
},
{
  date: "12 Jan 2001",
  description: "Business Income",
  amount: "+£55,000.00",
  balance: "£-1,177,793.70",
  color: "#16a34a",
},
{
  date: "20 Dec 2000",
  description: "Salary Credit",
  amount: "+£45,000.00",
  balance: "£-1,232,793.70",
  color: "#16a34a",
},
{
  date: "15 Nov 2000",
  description: "Vehicle Insurance",
  amount: "-£650.00",
  balance: "£-1,277,793.70",
  color: "#dc2626",
},
{
  date: "09 Oct 2000",
  description: "Electricity Bill",
  amount: "-£185.00",
  balance: "£-1,277,143.70",
  color: "#dc2626",
},
{
  date: "28 Aug 2000",
  description: "Salary Credit",
  amount: "+£42,000.00",
  balance: "£-1,276,958.70",
  color: "#16a34a",
},
{
  date: "11 Jul 2000",
  description: "ATM Cash Withdrawal",
  amount: "-£350.00",
  balance: "£-1,318,958.70",
  color: "#dc2626",
},
{
  date: "18 Jun 2000",
  description: "Business Income",
  amount: "+£38,000.00",
  balance: "£-1,318,608.70",
  color: "#16a34a",
},
{
  date: "07 May 2000",
  description: "Opening Deposit",
  amount: "+£250,000.00",
  balance: "£-1,356,608.70",
  color: "#16a34a",
},
{
  date: "14 Apr 2000",
  description: "Account Funding",
  amount: "+£150,000.00",
  balance: "£-1,606,608.70",
  color: "#16a34a",
},
{
  date: "20 Mar 2000",
  description: "Initial Savings Deposit",
  amount: "+£80,000.00",
  balance: "£-1,756,608.70",
  color: "#16a34a",
},
{
  date: "01 Feb 2000",
  description: "Account Activation",
  amount: "+£25,000.00",
  balance: "£-1,836,608.70",
  color: "#16a34a",
},
{
  date: "14 Jan 2000",
  description: "Royal Bank Account Opened",
  amount: "+£5,000.00",
  balance: "£-1,861,608.70",
  color: "#16a34a",
},
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
        overflowY: "auto",
height: "100vh",
paddingBottom: "80px",
      }}
    >
      <button
        onClick={() => setPage("dashboard")}
        style={{
          background: "#005EB8",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00205B", marginTop: "20px" }}>
        Royal Bank Transaction History
      </h2>

      <div
        style={{
          background: "#fff",
          padding: "18px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow: "0 3px 12px rgba(0,0,0,.08)",
        }}
      >
        <p><strong>Account Holder:</strong> Kirsty Rehman</p>
        <p><strong>Account:</strong> ****2874</p>
        <p><strong>Status:</strong> Dormant</p>
        <p><strong>Last Activity:</strong> 18 December 2011</p>
        <p><strong>Available Balance:</strong> £1,600,900.00</p>
      </div>
      <h2
  style={{
    color: "#00205B",
    marginTop: "30px",
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  Full Transaction History
</h2>

      {transactions.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "18px",
            marginBottom: "15px",
            boxShadow: "0 3px 12px rgba(0,0,0,.06)",
          }}
        >
          <small style={{ color: "#666" }}>{item.date}</small>

          <h4 style={{ margin: "8px 0" }}>
            {item.description}
          </h4>

          <div
            style={{
              color: item.color,
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {item.amount}
          </div>

          <small
            style={{
              display: "block",
              marginTop: "10px",
              color: "#666",
            }}
          >
            Balance: {item.balance}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Transactions;