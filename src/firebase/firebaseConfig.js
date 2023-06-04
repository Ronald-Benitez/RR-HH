// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDMPmK3sCX_wACg6-iySbaEbz0ZICRkxYQ",
  authDomain: "rr-hh-c8808.firebaseapp.com",
  projectId: "rr-hh-c8808",
  storageBucket: "rr-hh-c8808.appspot.com",
  messagingSenderId: "999468529354",
  appId: "1:999468529354:web:477eb4a16e2fc00c52a633",
  measurementId: "G-34PQ3DF9E2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
