import React from "react";
import { getUser, isLoggedin, logout } from "../Data/Users";
import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const [userDropdownOpened, setUserDropdownOpened] = useState(false);
  return (
    <nav className="bg-gray-50 Navbar ">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <img
            src="/icon.png"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
      </div>
      <button
        className="Navbar--MenuButton"
        onClick={() => setUserDropdownOpened(!userDropdownOpened)}
      >
        {!isLoggedin() ? (
          <FontAwesomeIcon icon={faUser} />
        ) : (
          <img
            alt="User"
            className="Navbar--ProfileImage"
            src={getUser().picture}
          />
        )}
      </button>
    </nav>
  );
}
