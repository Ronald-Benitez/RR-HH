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

export const getEvaluations = (date) => {
  return getDocs(collection(db, `evaluations/${date}/employees`));
};

export const getEvaluation = (date, id) => {
  return getDoc(doc(db, `evaluations/${date}/employees`, id));
};

export const createEvaluation = (date, data) => {
  return setDoc(
    doc(db, `evaluations/${date}/employees`, data.employee + "-" + data.month+ "-" + data.name),
    data
  );
};

export const deleteEvaluation = (date, id) => {
  return deleteDoc(doc(db, `evaluations/${date}/employees`, id ));
};
