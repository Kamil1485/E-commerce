import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCL4rPIDhjMqep9ziU-TJljK0sq4ADH2FA",
  authDomain: "e-commerceapp-c8110.firebaseapp.com",
  projectId: "e-commerceapp-c8110",
  storageBucket: "e-commerceapp-c8110.appspot.com",
  messagingSenderId: "544881602744",
  appId: "1:544881602744:web:f19819fd04794ac21a444d",
  measurementId: "G-VQ0LCC9VNX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
