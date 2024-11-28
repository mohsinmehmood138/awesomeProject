// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoQm7h4cr1AdSUoujrYDrG0oQZ424fAck",
  authDomain: "exampleproject-ff218.firebaseapp.com",
  projectId: "exampleproject-ff218",
  storageBucket: "exampleproject-ff218.firebasestorage.app",
  messagingSenderId: "911641737272",
  appId: "1:911641737272:web:aa45a7d39c09802fe60ecd",
  measurementId: "G-FPQHDN3F7Q"
};

export const app = initializeApp(firebaseConfig);