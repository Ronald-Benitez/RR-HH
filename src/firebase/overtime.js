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

export const getOvertimes = (date) => {
  return getDocs(collection(db, `overtime-${date}`));
};

export const createOvertime = (data) => {
  const newKey = doc(collection(db, `overtime-${data.month}`)).id;
  data.id = newKey;
  return setDoc(doc(db, `overtime-${data.month}`, newKey), data);
};

export const updateOvertime = (data) => {
  return setDoc(doc(db, `overtime-${data.month}`, data.id), data);
};

export const deleteOvertime = (data) => {
  return deleteDoc(doc(db, `overtime-${data.month}`, data.id));
};

export const getOvertime = () => {
  return getDocs(collection(db, "overtime-junio-2023"));
};
