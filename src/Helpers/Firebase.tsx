import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9Zlm8DyQQJ8K0TvgAkmD_dHzDEc2LISE",
  authDomain: "sumr1-a928d.firebaseapp.com",
  projectId: "sumr1-a928d",
  storageBucket: "sumr1-a928d.appspot.com",
  messagingSenderId: "747655771062",
  appId: "1:747655771062:web:a514d7a56ff88c5f350717",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

export { app, analytics, auth };
