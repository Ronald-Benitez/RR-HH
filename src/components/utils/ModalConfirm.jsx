import Modal from "react-modal";
import React from "react";

export default function ModalConfirm({
  show,
  setShow,
  onConfirm,
  onCancel,
  title,
  message,
}) {
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={show}
      onRequestClose={() => setShow(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
          backgroundColor: "#18191A",
          color: "#fff",
          maxHeight: "50vh",
          maxWidth: "40vw",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="d-flex justify-content-evenly w-100 mt-4">
        <button className="btn btn-outline-light w-25" onClick={onConfirm}>
          Confirmar
        </button>
        <button
          className="btn btn-outline-light w-25"
          onClick={() => {
            setShow(false);
            onCancel ? onCancel() : null;
          }}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
