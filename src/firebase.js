import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGoCBIQnhsidTnz0eqYDDyAgmn-JsudpA",
    authDomain: "whatsapp-reprod.firebaseapp.com",
    projectId: "whatsapp-reprod",
    storageBucket: "whatsapp-reprod.appspot.com",
    messagingSenderId: "752322679999",
    appId: "1:752322679999:web:a64004a6bb7953cb51220a",
    measurementId: "G-P5TBDN2JL1"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export { auth, provider };
export default db;