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

export const getQuestionsTemplates = () => {
  return getDocs(collection(db, "questionsTemplates"));
};

export const getQuestionsTemplate = (id) => {
  return getDoc(doc(db, "questionsTemplates", id));
};

export const createQuestionsTemplate = (questionsTemplate) => {
  if (questionsTemplate.id) {
    return setDoc(
      doc(db, "questionsTemplates", questionsTemplate.id),
      questionsTemplate
    );
  }
  const newKey = doc(collection(db, "questionsTemplates")).id;
  questionsTemplate.id = newKey;
  return setDoc(doc(db, "questionsTemplates", newKey), questionsTemplate);
};

export const deleteQuestionsTemplate = (id) => {
  return deleteDoc(doc(db, "questionsTemplates", id));
};
