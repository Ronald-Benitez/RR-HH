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
          <Link className="navbar-brand" to="/">
            <img
              src="cropped-TBR-LOGO.png"
              width="40"
              height="40"
              className="d-inline-block align-text-top"
            />
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
                <Link className="navbar-brand" to="/areas">
                  <small>Areas</small>
                </Link>
              </li>
              <li className="nav-item">
                <DropdownLinker
                  placeholder={"Empleados"}
                  links={[
                    { label: "Empleados", url: "/employees" },
                    { label: "Planilla", url: "/payroll" },
                    { label: "Horas extra", url: "/overtime" },
                    { label: "Bonos", url: "/bonuses" },
                    { label: "Vacaciones", url: "/vacations" },
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
