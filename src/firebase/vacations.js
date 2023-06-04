import { app } from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export const getVacations = (date) => {
  return getDocs(collection(db, `vacations-${date}`));
};

export const createVacation = (data) => {
  return setDoc(doc(db, `vacations-${data.year}`, data.employee), data);
};

export const updateVacation = (data) => {
  return setDoc(doc(db, `vacations-${data.year}`, data.employee), data);
};

export const deleteVacation = (data) => {
  return deleteDoc(doc(db, `vacations-${data.year}`, data.employee));
};

