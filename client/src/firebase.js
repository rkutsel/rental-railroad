import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8xfWUVLDXpmZupODwemcX5ODe1Vlnz7Y",
  authDomain: "railroad-rental.firebaseapp.com",
  projectId: "railroad-rental",
  storageBucket: "railroad-rental.appspot.com",
  messagingSenderId: "683079928370",
  appId: "1:683079928370:web:a113a57f77e59ef3248a2b",
  measurementId: "G-ZJZ6XQV6QN",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
