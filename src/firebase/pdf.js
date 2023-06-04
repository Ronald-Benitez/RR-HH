import { storage } from "./firebaseConfig";
import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

export const uploadPDF = async (file, toaster) => {
  if (!file) return null;
  const id = v4();
  const storageRef = ref(storage, `pdfs/${id}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  await toaster.promise(uploadTask, {
    loading: "Subiendo pdf...",
    success: "PDF guardado correctamente",
    error: "Error al subir el pdf",
  });

  const url = await getDownloadURL(storageRef);

  return { id, url };
};

export const deletePDF = async (id, toaster) => {
  if (!id) return null;
  const storageRef = ref(storage, `pdfs/${id}`);
  toaster.promise(deleteObject(storageRef), {
    loading: "Eliminando pdf...",
    success: "PDF eliminado correctamente",
    error: "Error al eliminar el pdf",
  });
  return true;
};

export const getPdfUrl = async (id) => {
  if (!id) return null;
  const storageRef = ref(storage, `pdfs/${id}`);
  return await getDownloadURL(storageRef);
};
