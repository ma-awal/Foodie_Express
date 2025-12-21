import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBXiRzb2g0DSh29oXmG-NOBkTN4PvPT81U',
  authDomain: 'foodie-express-1717f.firebaseapp.com',
  projectId: 'foodie-express-1717f',
  storageBucket: 'foodie-express-1717f.firebasestorage.app',
  messagingSenderId: '967596197786',
  appId: '1:967596197786:web:cad1ab33b45c39fcd65c23',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
