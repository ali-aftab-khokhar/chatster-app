import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAG2MgKH3WxZ9JaF0xHzdbPluwfNI9N1sg",
    authDomain: "chatster-f1d7f.firebaseapp.com",
    projectId: "chatster-f1d7f",
    storageBucket: "chatster-f1d7f.appspot.com",
    messagingSenderId: "464306319640",
    appId: "1:464306319640:web:03152045591e47f8bf2e6d",
    measurementId: "G-S0G8ZGS94N"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()