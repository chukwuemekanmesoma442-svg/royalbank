const bankData = {
    login: {
  username: "KirstyRehman",
  password: "Royal@2026",
},
  customer: {
    name: "Kirsty Rehman",
    accountNumber: "****2874",
    sortCode: "16-28-74",
    currency: "GBP (£)",
    status: "Dormant",
  },

  account: {
    balance: "£1,600,900.00",
  },

  recentTransactions: [
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
  ],

  card: {
    type: "Royal Bank Platinum Debit Card",
    expiry: "12/11",
    status: "Dormant",
  },

 notifications: [
  {
    title: "Security Verification Required",
    message: "Complete your security verification to reactivate your account.",
  },
  {
    title: "Dormant Account Notice",
    message: "Your account remains dormant until verification is completed. Please contact customer support.",
  },
  {
    title: "Login Alert",
    message: "A successful login to your online banking account was detected.",
  },
  {
    title: "Welcome",
    message: "Thank you for banking with Royal Bank Online.",
  },
],

  security: {
  code: "",
},
  
};

export default bankData;