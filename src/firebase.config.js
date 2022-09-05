// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBYxki_PT9D2-Xx_5ZmYzTk44chkKdI-w",
  authDomain: "house-marketplace-b0dd1.firebaseapp.com",
  projectId: "house-marketplace-b0dd1",
  storageBucket: "house-marketplace-b0dd1.appspot.com",
  messagingSenderId: "939703639397",
  appId: "1:939703639397:web:ce54176188cc018b0dd58c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()