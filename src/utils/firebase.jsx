import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAw1fA9A64jR5oYF1n6D7yQltsExhhWgBQ",
  authDomain: "helply-me-c917f.firebaseapp.com",
  projectId: "helply-me-c917f",
  storageBucket: "helply-me-c917f.firebasestorage.app",
  messagingSenderId: "719828787669",
  appId: "1:719828787669:web:1a588ed15b001234835d5c",
  measurementId: "G-W2S5RT275L",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
