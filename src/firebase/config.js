
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
const firebaseConfig = {
  apiKey: "AIzaSyDq9w6YyxvkScmt6Qb54rht9iD52tmhVWk",
  authDomain: "olx-clone-cc8e6.firebaseapp.com",
  projectId: "olx-clone-cc8e6",
  storageBucket: "olx-clone-cc8e6.appspot.com",
  messagingSenderId: "470363849767",
  appId: "1:470363849767:web:6693bacb28a31a699b7a02",
  measurementId: "G-FKKZ7FT70Q"
};


const app = initializeApp(firebaseConfig);

export { app };

export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app);