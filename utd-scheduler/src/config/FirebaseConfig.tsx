// npm install firebase
//firebase login
//firebase init
//firebase deploy

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIdRF4pHxZo0dcMIOmN2WklotXj5kD7XE",
    authDomain: "cs4485-proj.firebaseapp.com",
    projectId: "cs4485-proj",
    storageBucket: "cs4485-proj.appspot.com",
    messagingSenderId: "395343695425",
    appId: "1:395343695425:web:62463424b2fe2c27f340c0",
    measurementId: "G-W1NJTPY7ZV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);