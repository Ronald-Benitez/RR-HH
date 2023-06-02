import React from "react";
import Modal from "react-modal";
import moment from "moment/moment";
import "moment/locale/es";

import ModalStyle from "../../utils/ModalStyle";

export default function SeeModal({ see, setSee, data }) {
  moment.locale("es");
  return (
    <Modal isOpen={see} onRequestClose={() => setSee(false)} style={ModalStyle}>
      <h2>Información del empleado</h2>

      <div className="mb-3">
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-6">
              <h4 className="mb-4">Información Personal</h4>
              <p>
                <strong>Nombres:</strong> <span id="names">{data.names}</span>
              </p>
              <p>
                <strong>Apellidos:</strong>{" "}
                <span id="lastNames">{data.lastNames}</span>
              </p>
              <p>
                <strong>Área:</strong> <span id="area">{data.area}</span>
              </p>
              <p>
                <strong>Cargo:</strong>{" "}
                <span id="position">{data.position}</span>
              </p>
              <p>
                <strong>Salario:</strong>{" "}
                <span id="salary">${data.salary}</span>
              </p>
              <p>
                <strong>Fecha de Ingreso:</strong>{" "}
                <span id="entryDate">
                  {moment(data.entryDate).format("LL")}
                </span>
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                <span id="birthDate">
                  {moment(data.birthDate).format("LL")}
                </span>
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="mb-4">Contacto</h4>
              <p>
                <strong>Teléfono:</strong>{" "}
                <span id="phone">
                  {data.phone
                    ? data.phone.substring(0, 4) +
                      "-" +
                      data.phone.substring(4, 8)
                    : "No registrado"}
                </span>
              </p>
              <p>
                <strong>Email:</strong> <span id="email">{data.email}</span>
              </p>
              <p>
                <strong>DUI:</strong> <span id="dui">{data.dui}</span>
              </p>
              <p>
                <strong>Cuenta Bancaria:</strong>{" "}
                <span id="bankAccount">{data.bankAccount}</span>
              </p>
              <p>
                <strong>Dirección:</strong>{" "}
                <span id="address">{data.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row w-100 justify-content-center">
        <button
          className="btn btn-outline-light col-12 col-md-6"
          onClick={() => setSee(false)}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
