
const bankData = {
  customer: {
    name: "Welcome",
    accountNumber: "",
    sortCode: "",
    currency: "GBP (£)",
    status: "Active",
  },

  account: {
    balance: "£0.00",
  },

  recentTransactions: [],

  card: {
    type: "Royal Bank Debit Card",
    expiry: "",
    status: "Inactive",
  },

  notifications: [
    {
      title: "Welcome",
      message: "Welcome to Royal Bank Demo.",
    },
  ],

  security: {
    code: "",
  },
};

export default bankData;
