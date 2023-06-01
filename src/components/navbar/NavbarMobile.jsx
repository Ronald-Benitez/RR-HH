import React from "react";

function NavbarMobile({ isOpen }) {
  return (
    <div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`navbar-collapse ${isOpen ? "show" : ""}`} id="mobile-menu">
        <div className="navbar-nav">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <a
            href="#"
            className="nav-link bg-gray-900 text-white rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="nav-link text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="nav-link text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="nav-link text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavbarMobile;
