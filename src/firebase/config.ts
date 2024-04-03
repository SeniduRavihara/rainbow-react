// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// export const db = getFirestore();
// connectFirestoreEmulator(db, "127.0.0.1", 8080);
// export const storage = getStorage();
// connectStorageEmulator(storage, "127.0.0.1", 9199);
// export const auth = getAuth();
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// export const provider = new GoogleAuthProvider();

// if (process.env.NODE_ENV === "development") {
//   const functions = getFunctions(app);
//   connectFunctionsEmulator(functions, "127.0.0.1", 5001);
// }


// const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
