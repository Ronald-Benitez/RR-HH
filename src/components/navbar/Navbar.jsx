import React from "react";
import { Link } from "react-router-dom";

import DropdownLinker from "./DropdownLinker";
import Logout from "../utils/Logout";
import ResetPassword from "../utils/ResetPassword";

export default function Navbar() {
  return (
    <div>
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
          <div
            className="collapse navbar-collapse d-flex mb-3 row align-items-center"
            id="navbarNav"
          >
            <ul className="navbar-nav col justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto col-1">
              <li className="nav-item mx-1">
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
