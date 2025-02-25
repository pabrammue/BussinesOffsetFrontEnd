// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7PD6Rqbi5PzX2emJKTvKzMlE17OtoOuQ",
  authDomain: "business-offset.firebaseapp.com",
  projectId: "business-offset",
  storageBucket: "business-offset.firebasestorage.app",
  messagingSenderId: "220771304303",
  appId: "1:220771304303:web:f68b757bd002f1c1635e9a",
  measurementId: "G-E052HJED1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);