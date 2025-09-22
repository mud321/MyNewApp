
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyCMGfxyi01yg-ozvJec0EL-3L_1ZkrxvL8",
//   authDomain: "loundary-application.firebaseapp.com",
//   projectId: "loundary-application",
//   storageBucket: "loundary-application.firebasestorage.app",
//   messagingSenderId: "890637822806",
//   appId: "1:890637822806:web:6c8284f4469e5ae96484f7"
// };

// const app = initializeApp(firebaseConfig);
// const auth=getAuth(app)

// const db=getFirestore();
// export {auth,db};

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMGfxyi01yg-ozvJec0EL-3L_1ZkrxvL8",
  authDomain: "loundary-application.firebaseapp.com",
  projectId: "loundary-application",
  storageBucket: "loundary-application.appspot.com",
  messagingSenderId: "890637822806",
  appId: "1:890637822806:web:6c8284f4469e5ae96484f7"
};

// ✅ Prevent re-initializing Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Export Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
