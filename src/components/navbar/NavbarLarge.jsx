import React from "react";
import DropdownLinker from "./DropdownLinker";

const links = [
  { label: "Your Profile", url: "#" },
  { label: "Settings", url: "#" },
  { label: "Sign out", url: "#" },
];

export default function NavbarLarge() {
  return (
    <div className="d-none d-sm-block ml-6">
      <div className="d-flex">
        <DropdownLinker links={links} placeholder="Your Profile" />
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Team
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Projects
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Calendar
        </a>
      </div>
    </div>
  );
}
