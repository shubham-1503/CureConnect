import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyASMoF14dBxIx20skQlkpJoM5LJRlkWaHw",
    authDomain: "cure-connect-web1.firebaseapp.com",
    projectId: "cure-connect-web1",
    storageBucket: "cure-connect-web1.appspot.com",
    messagingSenderId: "208726096495",
    appId: "1:208726096495:web:05dc0ec1a1babd1b9bab9a",
    measurementId: "G-D9S9TW207G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app); 

export default app;