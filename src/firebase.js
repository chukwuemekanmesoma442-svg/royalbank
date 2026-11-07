
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Keep your existing Firebase configuration values here.
  apiKey: "AIzaSyAhnAnBiLVTA1Ce5dWb-Tz4J8f7gFMOK1A",
  authDomain: "royal-bank-8d7bc.firebaseapp.com",
  projectId: "royal-bank-8d7bc",
  storageBucket: "royal-bank-8d7bc.firebasestorage.app",
  messagingSenderId: "910512768264",
  appId: "1:910512768264:web:751c942ecc47978860d8bd",
  measurementId: "G-KMKHMP9JXD"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
