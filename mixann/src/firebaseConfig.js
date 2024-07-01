// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9WzFNf3f-DRgZAP1eFV2SmWYEvSUfw6s",
  authDomain: "mixann-2a80e.firebaseapp.com",
  projectId: "mixann-2a80e",
  storageBucket: "mixann-2a80e.appspot.com",
  messagingSenderId: "26266918498",
  appId: "1:26266918498:web:38981ea9812845d4f23b3b",
  measurementId: "G-CFCL37DW43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);