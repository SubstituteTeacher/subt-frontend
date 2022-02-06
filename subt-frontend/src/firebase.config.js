import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKw53meNGvORRAZOahyT0DwHdBtMYeehI",
  authDomain: "doitnow-da98a.firebaseapp.com",
  projectId: "doitnow-da98a",
  storageBucket: "doitnow-da98a.appspot.com",
  messagingSenderId: "273455128913",
  appId: "1:273455128913:web:461f33e198a3fad7c4b370",
  measurementId: "G-WKWZQFMFBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);