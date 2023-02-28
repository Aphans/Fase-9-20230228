// Import the functions you need from the SDKs you need
//Aquí debemo comprobar si el 9.6.2 es la última versión...
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDhuYKAaYIrnIPI3_rlJqh1CfJIoI7NAqE",
    authDomain: "talleres-3d2f5.firebaseapp.com",
    projectId: "talleres-3d2f5",
    storageBucket: "talleres-3d2f5.appspot.com",
    messagingSenderId: "827084446094",
    appId: "1:827084446094:web:b47640de02dbaa875aacdf",
    measurementId: "G-TGF7XW6Z3F"
  };
  

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore()

//Obtenemos los talleres de manera estática
export const dameTalleres = (ref)=> getDocs(collection(db,ref))

//Qué pasa si la referencia de talleres cambia...
export const onDameTalleres = (ref, callback) => onSnapshot(collection(db,ref), callback)

//Añadimos una nueva reserva
export const anadeReserva = (ref, reserva) => addDoc(collection(db,ref),reserva)

//Eliminamos una reserva
export const borraReserva = (ref, id) => deleteDoc(doc(db,ref,id))

//Buscamos un documento para su posterior modificación
export const buscaDoc = (ref,id) => getDoc(doc(db,ref,id))

//Actualizamos la reserva
export const actualizaReserva = (ref,id,objeto) => updateDoc(doc(db,ref,id), objeto)