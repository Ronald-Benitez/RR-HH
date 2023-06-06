import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";

export default function SeeModal({ show, setShow, data }) {
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={show}
      onRequestClose={() => setShow(false)}
      style={ModalStyle}
    >
      <div className="container overflow-auto">
        <h2 className="text-center my-4">Información de la falta</h2>

        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-3">
            <strong>
              <p>Empleado:</p>
            </strong>
          </div>
          <div className="col-12 col-md-7">
            <p>{data.name}</p>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-3">
            <strong>
              <p>Inicio:</p>
            </strong>
          </div>
          <div className="col-12 col-md-7">
            <p>{moment(data.start).format("LL")}</p>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-3">
            <strong>
              <p>Fin:</p>
            </strong>
          </div>
          <div className="col-12 col-md-7">
            <p>{moment(data.end).format("LL")}</p>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-3">
            <strong>
              <p>Tipo:</p>
            </strong>
          </div>
          <div className="col-12 col-md-7">
            <p>{data.type}</p>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-3">
            <strong>
              <p>Comentarios:</p>
            </strong>
          </div>
          <div className="col-12 col-md-7">
            <p>{data.comment}</p>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <button
            className="btn btn-outline-light col-12 col-md-6"
            onClick={() => setShow(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
