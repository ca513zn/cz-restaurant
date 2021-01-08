import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../config";

let fb;
if (!firebase.apps.length) {
  fb = firebase.initializeApp(firebaseConfig);
}
export const db = fb.firestore();

export default fb;
