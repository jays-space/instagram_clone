import { initializeApp } from "firebase/app";
import { FieldValue, getFirestore, addDoc, collection } from "firebase/firestore";
import "firebase/auth";

//FIREBASE CONFIG
import FirebaseConfig from "../firebaseConfig";

export const firebase = initializeApp(FirebaseConfig);
export const fieldValue = FieldValue;
export const db = getFirestore();
