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

export const getAreas = () => {
  return getDocs(collection(db, "areas"));
};

export const getArea = (id) => {
  return getDoc(doc(db, "areas", id));
};

export const createArea = (area) => {
  const newKey = doc(collection(db, "areas")).id;
  area.id = newKey;
  return setDoc(doc(db, "areas", newKey), area);
};

export const updateArea = (area) => {
  return setDoc(doc(db, "areas", area.id), area);
};

export const deleteArea = (id) => {
  return deleteDoc(doc(db, "areas", id));
};
