//Importando las librerias de Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Importando la configuracion de mi cuento Google
import { firebaseConfig } from "../config";

let fb;
if (!firebase.apps.length) {
  fb = firebase.initializeApp(firebaseConfig);
}

//Creando la conexion a la base de datos
export const db = fb.firestore();

export default fb;
