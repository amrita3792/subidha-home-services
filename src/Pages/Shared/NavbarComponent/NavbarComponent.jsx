import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarComponent.module.css";
import { List, MagnifyingGlass,  } from "@phosphor-icons/react";

const NavbarComponent = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarState = (isOpen) => {
    setOpenSidebar((prev) => !prev)
  }

  openSidebar && window.addEventListener("scroll", function() {
    setOpenSidebar(false);
  })

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
    <nav className="shadow-lg bg-gradient-to-r to-slate-500 from-slate-800 h-16 px-5">
      <div className="xl:max-w-screen-xl mx-auto flex items-center justify-end lg:justify-between h-full">
        <ul className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 fixed lg:static  top-0 ${openSidebar ? "right-0" : "right-[-1000px]"} bg-white lg:bg-inherit w-1/2 lg:w-auto h-screen lg:h-auto p-10 lg:p-0 z-50 transition-all lg:transition-none duration-500 ease-in-out`}>
          {navLinks.map((navLink) => (
            <li key={navLink.idx}>
              <Link
                className={`font-medium text-sm lg:text-white ${styles.hover_underline_animation}`}
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
          <button className="lg:hidden" onClick={handleSidebarState}><List size={32} color="white" /></button>
          {/* <button>
            <User color="white" size={25} />
          </button> */}
        </div>
      </div>
      {openSidebar && <div onClick={handleSidebarState} className="absolute top-0 left-0 w-full h-[2000px] bg-black opacity-25 lg:hidden"></div>}
    </nav>
  );
};

export default NavbarComponent;
