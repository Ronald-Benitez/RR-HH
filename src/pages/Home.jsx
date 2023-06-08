import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container align-items-center">
        <div className="row d-flex justify-content-evenly h-100 mt-5">
          <div className="card col-12 col-md-5 m-4 bg-light text-dark">
            <div className="card-header bg-dark text-light mt-1">
              Candidatos
            </div>
            <div className="card-body">
              <p className="card-text">
                Gestión de cantidados para el proceso de reclutamiento.
              </p>
              <Link to="/candidates" className="btn btn-dark">
                Ir a candidatos
              </Link>
            </div>
          </div>
          <div className="card col-12 col-md-5 m-4 bg-light text-dark">
            <div className="card-header bg-dark text-light mt-1">Empleados</div>
            <div className="card-body">
              <p className="card-text">Gestión de empleados.</p>
              <Link to="/employees" className="btn btn-dark">
                Ir a empleados
              </Link>
            </div>
          </div>
          <div className="card col-12 col-md-5 m-4 bg-light text-dark">
            <div className="card-header bg-dark text-light mt-1">Planilla</div>
            <div className="card-body">
              <p className="card-text">Gestión de planilla.</p>
              <Link to="/payroll" className="btn btn-dark">
                Ir a planilla
              </Link>
            </div>
          </div>
          <div className="card col-12 col-md-5 m-4 bg-light text-dark">
            <div className="card-header bg-dark text-light mt-1">
              Evaluacion
            </div>
            <div className="card-body">
              <p className="card-text">Evaluacion de personal</p>
              <Link to="/evaluations" className="btn btn-dark">
                Ir a evaluacion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
