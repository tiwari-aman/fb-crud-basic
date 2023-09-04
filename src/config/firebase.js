// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByEUxRh0NSttN81AFUwEr1Z5zYIRnF9JI",
  authDomain: "fir-crud-and-basic.firebaseapp.com",
  projectId: "fir-crud-and-basic",
  storageBucket: "fir-crud-and-basic.appspot.com",
  messagingSenderId: "947689163809",
  appId: "1:947689163809:web:c047063867da81b7292760",
  measurementId: "G-HTWZ8TMG2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)