import { useEffect } from "react";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const DropdownLinker = ({ links, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (event.target.className !== "dropdown-item") {
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
          {links.map((link, index) => (
            <Fragment key={index}>
              <Link
                className="dropdown-item"
                to={link.url}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
              {index < links.length - 1 && (
                <div className="dropdown-divider"></div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownLinker;
