import { initializeApp } from "firebase/app";
import {
  FieldValue,
  getFirestore,
  addDoc,
  collection,
} from "firebase/firestore";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

//FIREBASE CONFIG
import FirebaseConfig from "../firebaseConfig";
import "firebase/auth";

export const firebase = initializeApp(FirebaseConfig);
export const fieldValue = FieldValue;
export const db = getFirestore();
export const auth = getAuth();
export const signinWithEmailAndPassword = signInWithEmailAndPassword;
