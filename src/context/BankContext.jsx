
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import bankData from "../data/bankData";

export const BankContext = createContext();

export function BankProvider({ children }) {
  const [bank, setBank] = useState(bankData);
  const [transfers, setTransfers] = useState([]);
  const [loadingTransfers, setLoadingTransfers] = useState(true);

  // Listen to bank account data.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "bank", "royalbank"),
      (docSnap) => {
        if (docSnap.exists()) {
          const firestoreData = docSnap.data();

          setBank({
            ...bankData,
            ...firestoreData,

            customer: {
              ...bankData.customer,
              ...(firestoreData.customer || {}),
            },

            account: {
              ...bankData.account,
              ...(firestoreData.account || {}),
            },

            card: {
              ...bankData.card,
              ...(firestoreData.card || {}),
            },

            security: {
              ...bankData.security,
              ...(firestoreData.security || {}),
            },

            // Keep customer demo login credentials local.
            login: bankData.login,
          });
        }
      },
      (error) => {
        console.error("Firestore Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to submitted transfers for all demo users.
  useEffect(() => {
    setLoadingTransfers(true);

    const transfersRef = collection(
      db,
      "bank",
      "royalbank",
      "transfers"
    );

    const unsubscribe = onSnapshot(
      transfersRef,
      (snapshot) => {
        const records = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setTransfers(records);
        setLoadingTransfers(false);
      },
      (error) => {
        console.error("Transfers Error:", error);
        setTransfers([]);
        setLoadingTransfers(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save a new demo transfer.
  const submitTransfer = useCallback(async (details) => {
    const requiredFields = [
      "recipientName",
      "bankName",
      "accountNumber",
      "amount",
    ];

    for (const field of requiredFields) {
      if (!String(details[field] ?? "").trim()) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const transfersRef = collection(
      db,
      "bank",
      "royalbank",
      "transfers"
    );

    const transferRecord = {
      recipientName: String(details.recipientName).trim(),
      bankName: String(details.bankName).trim(),
      accountNumber: String(details.accountNumber).trim(),
      sortCode: String(details.sortCode ?? "").trim(),
      amount: String(details.amount).trim(),
      paymentReference: String(
        details.paymentReference ?? ""
      ).trim(),
      status: "pending",
      createdAt: serverTimestamp(),
    };

    const savedRecord = await addDoc(
      transfersRef,
      transferRecord
    );

    return {
      id: savedRecord.id,
      ...transferRecord,
    };
  }, []);

  return (
    <BankContext.Provider
      value={{
        bank,
        setBank,
        transfers,
        loadingTransfers,
        submitTransfer,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}
