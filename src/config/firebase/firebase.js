// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE9S6MAgJcANwzJbI4V5KIPgRGYjYWr_A",
  authDomain: "login-project-15f09.firebaseapp.com",
  projectId: "login-project-15f09",
  storageBucket: "login-project-15f09.appspot.com",
  messagingSenderId: "579497264070",
  appId: "1:579497264070:web:aa0e859fb677140ded68c7",
  measurementId: "G-3CVS1MRZ30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
