import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//FIREBASE CONFIG
import FirebaseConfig from "../firebaseConfig";

export const firebase = initializeApp(FirebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
// console.log("auth: ", JSON.stringify(auth));
export * as firestore from "firebase/firestore";
export * as authentication from "firebase/auth";
