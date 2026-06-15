// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSed5i1BcAcN2iIoI-LJ8hZqWRYm4Akj4",
  authDomain: "psychologists-services-6a939.firebaseapp.com",
  databaseURL: "https://psychologists-services-6a939-default-rtdb.firebaseio.com",
  projectId: "psychologists-services-6a939",
  storageBucket: "psychologists-services-6a939.firebasestorage.app",
  messagingSenderId: "105137441466",
  appId: "1:105137441466:web:3888abb150a1edc955d083",
  measurementId: "G-EMVWJB7SKC"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);