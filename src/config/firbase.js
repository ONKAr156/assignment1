import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider,signInWithEmailAndPassword } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC_lkkecFqetDf934F-TZiL2HQFrVV6MYs",
  authDomain: "auth-d1f11.firebaseapp.com",
  projectId: "auth-d1f11",
  storageBucket: "auth-d1f11.appspot.com",
  messagingSenderId: "806460943808",
  appId: "1:806460943808:web:4e400ce821cf545dd22c25"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
// export const emailAndPass = signInWithEmailAndPassword(googleProvider)