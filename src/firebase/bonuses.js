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

export const getBonuses = (date) => {
  return getDocs(collection(db, `bonuses-${date}`));
};

export const createBonus = (data) => {
  const newKey = doc(collection(db, `bonuses-${data.month}`)).id;
  data.id = newKey;
  return setDoc(doc(db, `bonuses-${data.month}`, newKey), data);
};

export const updateBonus = (data) => {
  return setDoc(doc(db, `bonuses-${data.month}`, data.id), data);
};

export const deleteBonus = (data) => {
  return deleteDoc(doc(db, `bonuses-${data.month}`, data.id));
};
