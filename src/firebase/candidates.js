import { app } from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export const getCandidates = () => {
  return getDocs(collection(db, "candidates"));
};

export const createCandidate = (candidate) => {
  const newKey = doc(collection(db, "candidates")).id;
  candidate.id = newKey;
  return setDoc(doc(db, "candidates", newKey), candidate);
};

export const updateCandidate = (candidate) => {
  return setDoc(doc(db, "candidates", candidate.id), candidate);
};

export const deleteCandidate = (id) => {
  return deleteDoc(doc(db, "candidates", id));
};
