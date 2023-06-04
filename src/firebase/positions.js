import { app } from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export const getPositions = () => {
  return getDocs(collection(db, "positions"));
};

export const createPosition = (data) => {
  const newKey = doc(collection(db, "positions")).id;
  data.id = newKey;
  return setDoc(doc(db, "positions", newKey), data);
};

export const updatePosition = (data) => {
  return setDoc(doc(db, "positions", data.id), data);
};

export const deletePosition = (id) => {
  return deleteDoc(doc(db, "positions", id));
};

export const getPosition = (id) => {
  return getDoc(doc(db, "positions", id));
};
