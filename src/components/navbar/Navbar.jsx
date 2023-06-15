import React from "react";
import { Link } from "react-router-dom";

import DropdownLinker from "./DropdownLinker";
import Logout from "../utils/Logout";
import ResetPassword from "../utils/ResetPassword";

export default function Navbar() {
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand btn btn-light text-dark btn-sm" to="/">
            <small>Inicio</small>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-center">
              <li className="nav-item">
                <DropdownLinker
                  placeholder={"Empleados"}
                  links={[
                    { label: "Empleados", url: "/employees" },
                    { label: "Planilla", url: "/payroll" },
                    { label: "Bonos", url: "/bonuses" },
                  ]}
                />
              </li>
              <li className="nav-item">
                <DropdownLinker
                  placeholder={"Reclutamiento"}
                  links={[
                    { label: "Candidatos", url: "/candidates" },
                    { label: "Areas", url: "/areas" },
                    { label: "Puestos", url: "/positions" },
                  ]}
                />
              </li>
              <li className="nav-item">
                <DropdownLinker
                  placeholder={"Tiempo"}
                  links={[
                    { label: "Incapacidades", url: "/disabilities" },
                    { label: "Ausencias", url: "/absences" },
                    { label: "Horas extra", url: "/overtime" },
                    { label: "Vacaciones", url: "/vacations" },
                  ]}
                />
              </li>
              <li className="nav-item">
                <DropdownLinker
                  placeholder={"Evaluación"}
                  links={[
                    { label: "Evaluar", url: "/evaluations" },
                    { label: "Evaluaciones", url: "/evaluations-list" },
                    {
                      label: "Plantillas con criterios",
                      url: "/criteria-template",
                    },
                    {
                      label: "Plantillas con preguntas",
                      url: "/question-template",
                    },
                  ]}
                />
              </li>
              <li className="nav-item">
                <ResetPassword />
              </li>
              <li className="nav-item">
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
