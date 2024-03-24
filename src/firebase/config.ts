// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEWnPQeXqJGFtWLm1zqQVr1-zLpFdH7-8",
  authDomain: "rainbow-32f4a.firebaseapp.com",
  projectId: "rainbow-32f4a",
  storageBucket: "rainbow-32f4a.appspot.com",
  messagingSenderId: "586857758080",
  appId: "1:586857758080:web:e7e3a7cd676097905bd565",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
