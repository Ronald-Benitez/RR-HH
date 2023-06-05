import moment from "moment";
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

export const getDisabilities = (date) => {
  return getDocs(collection(db, `disabilities-${date}`));
};

export const createDisability = (data) => {
  return setDoc(
    doc(
      db,
      `disabilities-${data.year}`,
      data.employee + "-" + moment(data.start).format("MMMM-W")
    ),
    data
  );
};

export const deleteDisability = (data) => {
  return deleteDoc(
    doc(
      db,
      `disabilities-${data.year}`,
      data.employee + "-" + moment(data.start).format("MMMM-W")
    )
  );
};
