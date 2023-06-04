import { useState, useEffect } from "react";
import Modal from "react-modal";

import ModalStyle from "../../utils/ModalStyle";

export default function SeePosition({ data, see, setSee }) {
  return (
    <div>
      <Modal
        isOpen={see}
        onRequestClose={() => setSee(false)}
        style={ModalStyle}
        contentLabel="Ver puesto"
      >
        <div class="container overflow-auto">
          <div class="row">
            <h2 className="my-5 text-center">Información del Puesto</h2>
            <div class="col-md-6">
              <div class="mb-4">
                <h4>Nombre del Puesto:</h4>
                <p>{data.name}</p>
              </div>
              <div class="mb-4">
                <h4>Área:</h4>
                <p>{data.area}</p>
              </div>
              <div class="mb-4">
                <h4>Responsabilidades:</h4>
                <p>{data.responsibilities}</p>
              </div>
              <div class="mb-4">
                <h4>Requisitos:</h4>
                <p>{data.requirements}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-4">
                <h4>Salario:</h4>
                <p>${data.salary}</p>
              </div>
              <div class="mb-4">
                <h4>Habilidades:</h4>
                <p>{data.skills}</p>
              </div>
              <div class="mb-4">
                <h4>Experiencia:</h4>
                <p>{data.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
