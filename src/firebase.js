import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCFL3vicFNB92447ohrbjwvZ8mG2_8pGR8",
  authDomain: "whatsapp-clone-45b94.firebaseapp.com",
  projectId: "whatsapp-clone-45b94",
  storageBucket: "whatsapp-clone-45b94.appspot.com",
  messagingSenderId: "692104908052",
  appId: "1:692104908052:web:5c6753216c811ff61f0601",
  measurementId: "G-YNQ8ESB3QR",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
