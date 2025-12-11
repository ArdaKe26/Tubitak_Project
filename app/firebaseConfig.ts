import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVU4KPRdEKNdg0tt2hep4Ymy8RlatH_GM",
  authDomain: "ekinoks-database.firebaseapp.com",
  projectId: "ekinoks-database",
  storageBucket: "ekinoks-database.firebasestorage.app",
  messagingSenderId: "33498627652",
  appId: "1:33498627652:web:c238125d5942c1e1230611",
};

export const app = initializeApp(firebaseConfig);