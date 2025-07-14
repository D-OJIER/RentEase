// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import the necessary authentication functions
import { getAnalytics } from "firebase/analytics";

// Your Firebase config object (already set up from the Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBVGAwvj3IvREU0lOf5rmu41fERu00rhX4",
  authDomain: "renteasedatabase.firebaseapp.com",
  projectId: "renteasedatabase",
  storageBucket: "renteasedatabase.firebasestorage.app",
  messagingSenderId: "177224232527",
  appId: "1:177224232527:web:fa845a8cebabf07cb2c43a",
  measurementId: "G-XWFZGX7W16"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Optional: Initialize Firebase Analytics (not required for authentication)
const analytics = getAnalytics(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
