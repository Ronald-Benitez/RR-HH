import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ components, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? "show" : ""}`}>
      <button
        className="btn btn-dark dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        {placeholder}
      </button>
      {isOpen && (
        <div className="position-absolute" style={{ width: "200px" }}>
          <div className="bg-dark ">
            {components.map((component, index) => (
              <div key={index} onClick={handleLinkClick}>
                {component}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
