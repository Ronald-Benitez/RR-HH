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

export const getEvaluationTemplates = () => {
  return getDocs(collection(db, "evaluationTemplates"));
};

export const getEvaluationTemplate = (id) => {
  return getDoc(doc(db, "evaluationTemplates", id));
};

export const createEvaluationTemplate = (evaluationTemplate) => {
  if (evaluationTemplate.id) {
    return setDoc(
      doc(db, "evaluationTemplates", evaluationTemplate.id),
      evaluationTemplate
    );
  }
  const newKey = doc(collection(db, "evaluationTemplates")).id;
  evaluationTemplate.id = newKey;
  return setDoc(doc(db, "evaluationTemplates", newKey), evaluationTemplate);
};

export const deleteEvaluationTemplate = (id) => {
  return deleteDoc(doc(db, "evaluationTemplates", id));
};
