import { useState } from "react";
import Modal from "react-modal";

import ModalStyle from "../../utils/ModalStyle";
import { updateEmployee } from "../../firebase/employees";
import { uploadPDF, deletePDF } from "../../firebase/pdf";
import Icon from "../utils/Icon";

export default function UpdateCurriculum({ data, reload, setReload, toaster }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pdf, setPdf] = useState(null);

  const handleFile = async () => {
    if (!pdf) {
      toaster.error("Debe seleccionar un archivo");
      return;
    }
    if (!pdf || pdf.type !== "application/pdf") {
      toaster.error("El archivo debe ser un PDF");
      return;
    }

    const deleted = data.pdfId;
    const result = await uploadPDF(pdf, toaster);
    if (result) await deletePDF(deleted, toaster);
    return result;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await handleFile(e);
    if (result) {
      updateEmployee({
        ...data,
        pdfId: result.id,
        pdfUrl: result.url,
      })
        .then(() => {
          toaster.success("Curriculum actualizado exitosamente");
          setReload(!reload);
          setIsOpen(false);
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-success btn-sm mx-1"
        onClick={() => setIsOpen(true)}
      >
        <Icon icon="pdf" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center">Actualizar curriculum</h2>
              <h5 className="text-center">
                {data.names + " " + data.lastNames}
              </h5>

              <form onSubmit={handleUpdate}>
                <div className="row justify-content-center">
                  <div className="form-group col-12 col-md-8">
                    <label htmlFor="pdf">PDF</label>
                    <input
                      type="file"
                      className="form-control"
                      id="pdf"
                      onChange={(e) => setPdf(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="row justify-content-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-outline-light mt-3 col-12 col-md-4 m-1"
                  >
                    Actualizar
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-light mt-3 ml-3 col-12 col-md-4 m-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
