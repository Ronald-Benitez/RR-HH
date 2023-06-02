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

export const getEmployees = () => {
  return getDocs(collection(db, "employees"));
};

export const getEmployee = (id) => {
  return getDoc(doc(db, "employees", id));
};

export const createEmployee = (employee) => {
  const newKey = doc(collection(db, "employees")).id;
  employee.id = newKey;
  return setDoc(doc(db, "employees", newKey), employee);
};

export const updateEmployee = (employee) => {
  return setDoc(doc(db, "employees", employee.id), employee);
};

export const deleteEmployee = (id) => {
  return deleteDoc(doc(db, "employees", id));
};
