import { useState, useEffect } from "react";
import moment from "moment/moment";
import Modal from "react-modal";

import { getPosition } from "../../firebase/positions";
import ModalStyle from "../../utils/ModalStyle";
import { set } from "react-hook-form";

export default function SeeCandidate({ data, see, setSee }) {
  const [position, setPosition] = useState({});
  useEffect(() => {
    try {
      getPosition(data.position).then((res) => {
        setPosition(res.data());
      });
    } catch (error) {
      setPosition({});
    }
  }, [data]);

  const renderData = () => {
    return (
      <div className="row px-4">
        <h4 className="my-5 text-center">Información del Candidato</h4>
        <div className="mb-4">
          <h5>Nombre:</h5>
          <p>{data.names}</p>
        </div>
        <div className="mb-4">
          <h5>Apellido:</h5>
          <p>{data.lastNames}</p>
        </div>
        <div className="mb-4">
          <h5>DUI:</h5>
          <p>{data.dui}</p>
        </div>
        <div className="mb-4">
          <h5>Correo:</h5>
          <p>{data.email}</p>
        </div>
        <div className="mb-4">
          <h5>Fecha de Nacimiento:</h5>
          <p>{moment(data.birthDate).format("LL")}</p>
        </div>
        <div className="mb-4">
          <h5>Telefono:</h5>
          <p>{data.phone}</p>
        </div>
        <div className="mb-4">
          <h5>Direccion:</h5>
          <p>{data.address}</p>
        </div>
        <div className="mb-4">
          <h5>Fecha de registro:</h5>
          <p>{moment(data.date).format("LL")}</p>
        </div>
      </div>
    );
  };

  const renderPosition = () => {
    if (!position.name)
      return (
        <div className="row px-4">
          <h4 className="my-5 text-center">Información del Puesto</h4>
          <p>El puesto no esta registrado o ha sido eliminado</p>
        </div>
      );
    return (
      <div className="row px-4">
        <h4 className="my-5 text-center">Información del Puesto</h4>
        <div className="mb-4">
          <h5>Nombre del Puesto:</h5>
          <p>{position.name}</p>
        </div>
        <div className="mb-4">
          <h5>Área:</h5>
          <p>{position.area}</p>
        </div>
        <div className="mb-4">
          <h5>Responsabilidades:</h5>
          <p>{position.responsibilities}</p>
        </div>
        <div className="mb-4">
          <h5>Requisitos:</h5>
          <p>{position.requirements}</p>
        </div>
        <div className="mb-4">
          <h5>Salario:</h5>
          <p>${position.salary}</p>
        </div>
        <div className="mb-4">
          <h5>Habilidades:</h5>
          <p>{position.skills}</p>
        </div>
        <div className="mb-4">
          <h5>Experiencia:</h5>
          <p>{position.experience}</p>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={see}
      onRequestClose={() => setSee(false)}
      style={ModalStyle}
      contentLabel="Example Modal"
    >
      <div className="container overflow-auto">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center"> Información de reclutamiento </h3>
          </div>
          <div className="col-12 col-md-6">{renderData()}</div>
          <div className="col-12 col-md-6">{renderPosition()}</div>
        </div>
        <div className="row justify-content-center">
          <button
            className="btn btn-outline-light col-10 col-md-6"
            onClick={() => setSee(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
