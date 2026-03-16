
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBQIxo37-3ZVsRcQ42qKMU7ZM7aSRxF8mI",
  authDomain: "office-hub-a4eb9.firebaseapp.com",
  databaseURL: "https://office-hub-a4eb9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "office-hub-a4eb9",
  storageBucket: "office-hub-a4eb9.firebasestorage.app",
  messagingSenderId: "542465495074",
  appId: "1:542465495074:web:22201172ef1a707262ba7b",
  measurementId: "G-XZ42M5D22F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export the database so you can use it in other files
export const database = getDatabase(app);

// NEW: Initialize and export Auth and Google Provider for your Login page
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;