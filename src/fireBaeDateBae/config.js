import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVq9092-jIaW7dH9QmcaygFlN7-gr8Mus",
  authDomain: "project-forms-e7d54.firebaseapp.com",
  projectId: "project-forms-e7d54",
  storageBucket: "project-forms-e7d54.appspot.com",
  messagingSenderId: "257487114175",
  appId: "1:257487114175:web:7d6ad83ca93c17419b1b0a",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { fireStore, auth, timestamp, storage };
