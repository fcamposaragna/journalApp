import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCB8L8_CbPkgodKeO4Ddfxc4dGW4A_2u2c",
  authDomain: "journall-app-e0319.firebaseapp.com",
  projectId: "journall-app-e0319",
  storageBucket: "journall-app-e0319.appspot.com",
  messagingSenderId: "411893182198",
  appId: "1:411893182198:web:6e9a61ce63f6c15d57c6d7"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( firebaseApp );
export const FirebaseDB = getFirestore( firebaseApp );
