
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyDFbDp0z7cFgquuOftVU26KgcbjohAr4rU",
  authDomain:"fir-with-nextjs-da5ba.firebaseapp.com",
  projectId:"fir-with-nextjs-da5ba",
  storageBucket:"fir-with-nextjs-da5ba.appspot.com",
  messagingSenderId:"874766148913",
  appId:"1:874766148913:web:015f4e0eece1dbbee63c10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

