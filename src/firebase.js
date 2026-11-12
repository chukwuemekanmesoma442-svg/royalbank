
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAhnAnBiLVTA1Ce5dWb-Tz4J8f7gFMOK1A",
  authDomain: "royal-bank-8d7bc.firebaseapp.com",
  projectId: "royal-bank-8d7bc",
  storageBucket: "royal-bank-8d7bc.firebasestorage.app",
  messagingSenderId: "910512768264",
  appId: "1:910512768264:web:751c942ecc47978860d8bd",
  measurementId: "G-KMKHMP9JXD"
};

export const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Cloud Functions connection
export const functions = getFunctions(app, "us-central1");

// Separate authentication instance for creating customer accounts.
// This prevents customer creation from signing out the Admin.
const customerApp =
  getApps().find((item) => item.name === "customerAccounts") ||
  initializeApp(firebaseConfig, "customerAccounts");

export const customerAuth = getAuth(customerApp);
