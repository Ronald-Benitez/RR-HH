import { useState, useEffect } from "react";
import { updateArea } from "../../firebase/areas";
import Modal from "react-modal";

export default function ModalEdit({
  data,
  setReload,
  reload,
  toaster,
  setEdit,
  edit,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    data.name = name;
    data.description = description;

    updateArea(data)
      .then(() => {
        setReload(!reload);
        setEdit(false);
        toaster.success("Área actualizada exitosamente");
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
  }, [data]);

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={edit}
      onRequestClose={() => setEdit(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
          backgroundColor: "#18191A",
          color: "#fff",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "80vh",
          maxWidth: "60vw",
        },
      }}
    >
      <h2>Editar área</h2>
      <form onSubmit={handleEdit} className="col-12 col-md-6 p-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control bg-black text-white"
            placeholder="Nombre del área"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control bg-black text-white"
            placeholder="Descripción del área"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-evenly w-100 mt-4">
          <button className="btn btn-outline-light w-50" type="submit">
            Editar
          </button>
          <button
            className="btn btn-outline-light w-50"
            onClick={() => setEdit(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
