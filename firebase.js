
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAHJpdqC6Hy3BJ3HgBoovmTK2qT3DD0ulQ",
  authDomain: "waterapp-264f4.firebaseapp.com",
  projectId: "waterapp-264f4",
  storageBucket: "waterapp-264f4.appspot.com",
  messagingSenderId: "121358725194",
  appId: "1:121358725194:web:62327cd7577144c4e9b6b3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore();

export {auth, db};