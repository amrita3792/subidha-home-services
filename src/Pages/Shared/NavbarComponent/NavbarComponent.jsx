import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarComponent.module.css";
import {
  CaretLeft,
  List,
  MagnifyingGlass,
  Triangle,
  X,
} from "@phosphor-icons/react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { ChevronDoubleDownIcon, UserIcon } from "@heroicons/react/24/solid";

const NavbarComponent = () => {
  const { user } = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarState = () => {
    setOpenSidebar((prev) => !prev);
  };

  openSidebar &&
    window.addEventListener("scroll", function () {
      setOpenSidebar(false);
    });

  const navLinks = [
    {
      idx: 0,
      path: "/",
      name: "Home",
    },
    {
      idx: 1,
      path: "/all-services",
      name: "All Services",
    },
    {
      idx: 2,
      path: "/blog",
      name: "Blog",
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-400 to-slate-500 h-16">
      <div className="xl:max-w-screen-xl mx-auto flex items-center justify-end lg:justify-between h-full px-5">
        <ul
          className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 fixed lg:static  top-0 ${
            openSidebar ? "right-0" : "right-[-1000px]"
          } bg-white lg:bg-inherit w-1/2 lg:w-auto h-screen lg:h-auto p-10 lg:p-0 z-50 transition-all lg:transition-none duration-500 ease-in-out`}
        >
          <li
            onClick={handleSidebarState}
            className="flex items-center gap-1 font-medium text-sm cursor-pointer lg:hidden"
          >
            <CaretLeft size={16} /> <span>Go Back</span>
          </li>
          {navLinks.map((navLink) => (
            <li key={navLink.idx}>
              <Link
                className={`lg:text-white font-semibold text-sm  ${styles.hover_underline_animation}`}
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
          {user?.uid ? (
            <button className="text-white flex items-center gap-3">
              <UserIcon className="h-6 w-6" />
              <p className="flex items-center">
                <span className="text-sm font-semibold">Profile</span>
                <ChevronDoubleDownIcon className="h-6 w-6" />
              </p>
            </button>
          ) : (
            <button>
              <Link
                to="/login"
                className="block font-medium text-sm border-2 border-white text-white rounded-md px-4 py-2 active:scale-95"
              >
                LOGIN
              </Link>
            </button>
          )}
          {openSidebar ? (
            <button className="lg:hidden">
              <X size={32} color="white" />
            </button>
          ) : (
            <button className="lg:hidden" onClick={handleSidebarState}>
              <List size={32} color="white" />
            </button>
          )}
          {/* <button>
            <User color="white" size={25} />
          </button> */}
        </div>
      </div>
      {openSidebar && (
        <div
          onClick={handleSidebarState}
          className="absolute top-0 left-0 w-full h-[2000px] bg-black opacity-25 lg:hidden"
        ></div>
      )}
    </nav>
  );
};

export default NavbarComponent;
