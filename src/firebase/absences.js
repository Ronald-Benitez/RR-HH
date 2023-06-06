import moment from "moment/moment";
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

export const getAbsences = (date) => {
  return getDocs(collection(db, `absences-${date}`));
};

export const createAbsence = (data) => {
  return setDoc(
    doc(
      db,
      `absences-${moment(data.start).format("YYYY")}`,
      data.employee + "-" + moment(data.start).format("MM-DD")
    ),
    data
  );
};

export const deleteAbsence = (data) => {
  return deleteDoc(
    doc(
      db,
      `absences-${moment(data.start).format("YYYY")}`,
      data.employee + "-" + moment(data.start).format("MM-DD")
    )
  );
};
