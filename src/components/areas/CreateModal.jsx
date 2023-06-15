import React from "react";
import Modal from "react-modal";

import { createArea } from "../../firebase/areas";
import ModalStyle from "../../utils/ModalStyle";

export default function CreateModal({ toaster, reload, setReload }) {
  Modal.setAppElement("#root");

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [areaName, setAreaName] = React.useState("");
  const [areaDescription, setAreaDescription] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createArea({ name: areaName, description: areaDescription })
      .then(() => {
        toaster.success("Área creada exitosamente");
        setReload(!reload);
        setIsOpen(false);
        clear();
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const clear = () => {
    setAreaName("");
    setAreaDescription("");
  };

  return (
    <div>
      <button className="btn btn-outline-light" onClick={() => setIsOpen(true)}>
        Registrar una nueva área
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={ModalStyle}
      >
        <div className="container overflow-auto">
          <div className="row justify-conten-center">
            <h2 className="text-white text-center">Crear área</h2>
          </div>
          <div className="row justify-content-center">
            <form onSubmit={handleSubmit} className="col-12 col-md-6 p-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-black text-white"
                  placeholder="Nombre del área"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-black text-white"
                  placeholder="Descripción del área"
                  value={areaDescription}
                  onChange={(e) => setAreaDescription(e.target.value)}
                />
              </div>
              <div className="row">
                <button
                  type="submit"
                  className="btn btn-outline-light col-12 col-md-6 mt-2 mt-md-0"
                >
                  Crear
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light col-12 col-md-6 mt-2 mt-md-0"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
