import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6jCkV9C3GJBc_OlrEvHqyW8pCVXJFqps",
  authDomain: "custom-drink-maker.firebaseapp.com",
  projectId: "custom-drink-maker",
  storageBucket: "custom-drink-maker.firebasestorage.app",
  messagingSenderId: "372508337489",
  databaseURL: "https://custom-drink-maker.firebaseio.com",
  appId: "1:372508337489:web:b2b1316e39eb6372391f70",

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
