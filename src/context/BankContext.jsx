
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
  setDoc,
  getDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../firebase";
import bankData from "../data/bankData";

export const BankContext = createContext();

export function BankProvider({ children }) {
  const [bank, setBank] = useState(bankData);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [customerProfile, setCustomerProfile] = useState(null);
  const [loadingCustomerProfile, setLoadingCustomerProfile] = useState(true);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  const [transfers, setTransfers] = useState([]);
  const [loadingTransfers, setLoadingTransfers] = useState(true);

  // Track the signed-in user and verify administrator access.
  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) return;

      setCurrentUser(user);
      setIsAdmin(false);
      setCustomerProfile(null);
      setLoadingCustomerProfile(!!user);
      setLoadingTransfers(true);

      if (!user) {
        setCustomers([]);
        setSelectedCustomerId("");
        setLoadingCustomers(false);
        setLoadingCustomerProfile(false);
        setLoadingTransfers(false);
        return;
      }

      try {
        const adminSnapshot = await getDoc(
          doc(db, "admins", user.uid)
        );

        if (active && auth.currentUser?.uid === user.uid) {
          setIsAdmin(
            adminSnapshot.exists() &&
            adminSnapshot.data().enabled === true
          );
        }
      } catch (error) {
        console.error("Admin verification error:", error);

        if (active) {
          setIsAdmin(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Listen to the original public demo bank record.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "bank", "royalbank"),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          setBank({
            ...bankData,
            ...data,
            customer: {
              ...bankData.customer,
              ...(data.customer || {}),
            },
            account: {
              ...bankData.account,
              ...(data.account || {}),
            },
            card: {
              ...bankData.card,
              ...(data.card || {}),
            },
            security: {
              ...bankData.security,
              ...(data.security || {}),
            },
            login: bankData.login,
          });
        }
      },
      (error) => console.error("Bank Error:", error)
    );

    return unsubscribe;
  }, []);

  // Load the signed-in customer's own profile.
  useEffect(() => {
    if (!currentUser || isAdmin) {
      setCustomerProfile(null);
      setLoadingCustomerProfile(false);
      return;
    }

    setLoadingCustomerProfile(true);

    const customerRef = doc(
      db,
      "bank",
      "royalbank",
      "customers",
      currentUser.uid
    );

    const unsubscribe = onSnapshot(
      customerRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setCustomerProfile({
            id: snapshot.id,
            ...snapshot.data(),
          });

          setLoadingCustomerProfile(false);
        } else {
          setCustomerProfile(null);
          setLoadingCustomerProfile(false);

          console.error(
            "No customer profile exists for this account."
          );
        }
      },
      (error) => {
        console.error("Customer profile error:", error);
        setCustomerProfile(null);
        setLoadingCustomerProfile(false);
      }
    );

    return unsubscribe;
  }, [currentUser, isAdmin]);

  // Only administrators load the complete customer collection.
  useEffect(() => {
    if (!isAdmin) {
      setCustomers([]);
      setSelectedCustomerId("");
      setLoadingCustomers(false);
      return;
    }

    setLoadingCustomers(true);

    const customersRef = collection(
      db,
      "bank",
      "royalbank",
      "customers"
    );

    const unsubscribe = onSnapshot(
      customersRef,
      (snapshot) => {
        const records = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setCustomers(records);
        setLoadingCustomers(false);

        setSelectedCustomerId((current) => {
          if (
            current &&
            records.some((item) => item.id === current)
          ) {
            return current;
          }

          return records[0]?.id || "";
        });
      },
      (error) => {
        console.error("Customers Error:", error);
        setCustomers([]);
        setLoadingCustomers(false);
      }
    );

    return unsubscribe;
  }, [isAdmin]);

  // Select the appropriate customer profile.
  const selectedCustomer = isAdmin
    ? customers.find(
        (item) => item.id === selectedCustomerId
      ) || null
    : customerProfile;

  const selectCustomer = useCallback((customerId) => {
    setSelectedCustomerId(customerId);
  }, []);

  // Save customer information.
  const saveCustomer = useCallback(
    async (customerId, data) => {
      if (!customerId) {
        throw new Error("Customer ID is required.");
      }

      await setDoc(
        doc(db, "bank", "royalbank", "customers", customerId),
        {
          ...data,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    },
    []
  );

  // Load all transfers for Admin, or only the signed-in customer's transfers.
  useEffect(() => {
    if (!currentUser) {
      setTransfers([]);
      setLoadingTransfers(false);
      return;
    }

    setLoadingTransfers(true);

    const transfersRef = collection(
      db,
      "bank",
      "royalbank",
      "transfers"
    );

    const transfersQuery = isAdmin
      ? transfersRef
      : query(
          transfersRef,
          where("customerId", "==", currentUser.uid)
        );

    const unsubscribe = onSnapshot(
      transfersQuery,
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

    return unsubscribe;
  }, [currentUser, isAdmin]);

  // Submit a simulated transfer for the authenticated customer.
  const submitTransfer = useCallback(
    async (details) => {
      const user = auth.currentUser;

      if (!user) {
        throw new Error(
          "Please sign in before submitting a transfer."
        );
      }

      const required = [
        "recipientName",
        "bankName",
        "accountNumber",
        "amount",
      ];

      for (const field of required) {
        if (!String(details[field] ?? "").trim()) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Customers can only submit transfers under their own UID.
      // Administrators can use the currently selected demo customer.
      const customerId = isAdmin
        ? selectedCustomerId
        : user.uid;

      if (!customerId) {
        throw new Error("No customer account is selected.");
      }

      const record = {
        recipientName: String(details.recipientName).trim(),
        bankName: String(details.bankName).trim(),
        accountNumber: String(details.accountNumber).trim(),
        sortCode: String(details.sortCode ?? "").trim(),
        amount: String(details.amount).trim(),
        paymentReference: String(
          details.paymentReference ?? ""
        ).trim(),
        customerId,
        status: "pending",
        createdAt: serverTimestamp(),
        demo: true,
      };

      const saved = await addDoc(
        collection(db, "bank", "royalbank", "transfers"),
        record
      );

      return {
        id: saved.id,
        ...record,
      };
    },
    [isAdmin, selectedCustomerId]
  );

  return (
    <BankContext.Provider
      value={{
        bank,
        setBank,
        currentUser,
        isAdmin,
        customerProfile,
        loadingCustomerProfile,
        customers,
        loadingCustomers,
        saveCustomer,
        selectedCustomer,
        selectedCustomerId,
        selectCustomer,
        transfers,
        loadingTransfers,
        submitTransfer,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}
