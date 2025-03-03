import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { API_KEY, APP_ID } from "./secrets";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "laundary-mate.firebaseapp.com",
    projectId: "laundary-mate",
    storageBucket: "laundary-mate.firebasestorage.app",
    messagingSenderId: "977734862876",
    appId: APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };