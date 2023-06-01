import React, { useState } from "react";

const Dropdown = ({ components, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${isOpen ? "show" : ""}`}>
      <button
        className="btn btn-dark dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        {placeholder}
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          {components.map((component, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={handleLinkClick}
            >
              {component}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
