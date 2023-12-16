import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarComponent.module.css";
import { Avatar } from "keep-react";
import { MagnifyingGlass, User } from "@phosphor-icons/react";

const NavbarComponent = () => {
  const navLinks = [
    {
      idx: 0,
      path: "/",
      name: "HOME",
    },
    {
      idx: 1,
      path: "/all-services",
      name: "ALL SERVICES",
    },
    {
      idx: 2,
      path: "/blog",
      name: "BLOG",
    },
  ];

  return (
    <nav className="shadow-lg bg-gradient-to-r to-slate-500 from-slate-800">
      <div className="xl:max-w-screen-xl mx-auto flex items-center justify-between">
        <ul className="flex items-center gap-7 h-16">
          {navLinks.map((navLink) => (
            <li key={navLink.idx}>
              <Link
                className={`font-medium text-sm text-white ${styles.hover_underline_animation}`}
                to={navLink.path}
              >
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <button>
            <MagnifyingGlass color="white" size={25} />
          </button>
          <button>
            <Link className="block font-medium text-white text-sm border-2 rounded-md px-4 py-2 active:scale-95">
              LOGIN
            </Link>
          </button>
          {/* <button>
            <User color="white" size={25} />
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
