import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

import { BankProvider } from "./context/BankContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BankProvider>
      <App />
    </BankProvider>
  </React.StrictMode>
);