
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyD7fOdSvFYp5JCaPi9Pz_hDmWYfxfJd05c",
    authDomain: "pantry-c2772.firebaseapp.com",
    projectId: "pantry-c2772",
    storageBucket: "pantry-c2772.appspot.com",
    messagingSenderId: "811623403533",
    appId: "1:811623403533:web:4bff5eb3c75266c3324544",
    measurementId: "G-5RX7MH893D"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);
//export const db= getFirestore(app);
const firestore =getFirestore(app)
export{ firestore}