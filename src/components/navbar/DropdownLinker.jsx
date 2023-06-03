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
