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
          width: "40%",
          height: "40%",
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
        <button className="btn btn-outline-light" onClick={onConfirm}>
          Confirmar
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => {
            setShow(false);
            onCancel();
          }}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
