import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarComponent.module.css";
import { CaretLeft, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChevronDoubleDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../../../App";
import { profileLinks } from "../../../utilities/user-dashboard-links";
import UserAccessLinks from "../UserAccessLinks/UserAccessLinks";

const NavbarComponent = ({ isMounted }) => {
  const { user } = useContext(AuthContext);
  const { theme, handleToggle } = useContext(ThemeContext);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarState = () => {
    setOpenSidebar((prev) => !prev);
  };

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
    <nav className="bg-[#1d2736] h-16 relative">
      <div className="xl:max-w-screen-xl mx-auto flex items-center justify-end lg:justify-between h-full px-5">
        <ul
          className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 fixed z-[30000] lg:z-auto lg:static  top-0 ${
            openSidebar ? "right-0" : "right-[-1000px]"
          } ${
            theme === "light" ? "bg-white" : "bg-[#1D232A]"
          } lg:bg-inherit w-4/5 md:w-1/2 lg:w-auto h-screen lg lg:h-auto p-10 lg:p-0 z-50 transition-all lg:transition-none duration-500 ease-in-out`}
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
                onClick={handleSidebarState}
                className={`text-sm lg:text-white  ${styles.hover_underline_animation}`}
                to={navLink.path}
              >
                {navLink.name}
              </Link>
            </li>
          ))}
          <li className="menu bg-base-200 rounded-box p-0 lg:hidden bg-inherit">
            <details open>
              <summary className="text-base  hover:bg-none p-0">
                Dashboard
              </summary>
              <ul className="gap-8">
                {profileLinks.map((profileLink) => (
                  <li key={profileLink.id}>
                    <Link to={profileLink.path}>{profileLink.name}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          {isMounted && (
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden cursor-pointer text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </label>
          )}
          <button>
            <MagnifyingGlass color="white" size={25} />
          </button>
          <button className="text-blac cursor-pointer text-white">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                onChange={handleToggle}
                type="checkbox"
                checked={theme === "light" ? false : true}
              />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </button>
          {user?.uid ? (
            user?.photoURL ? (
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative"
              >
                <img
                  className="w-10 h-10 rounded-full  cursor-pointer"
                  src={user.photoURL}
                  alt=""
                />
                <UserAccessLinks isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            ) : (
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative"
              >
                <div className="text-white flex items-center gap-3">
                  <UserIcon className="h-6 w-6" />
                  <p className="flex items-center">
                    <span className="text-sm font-semibold">Profile</span>
                    <ChevronDoubleDownIcon className="h-6 w-6" />
                  </p>
                </div>
                <UserAccessLinks isOpen={isOpen} setIsOpen={setIsOpen} />
              </button>
            )
          ) : (
            <button>
              <Link
                to="/login"
                className="btn bg-inherit hover:bg-inherit text-white border-2 border-white"
              >
                LOG IN
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
          className="fixed z-[29999] top-0 left-0 w-full min-h-[3000px] bg-black opacity-60 lg:hidden"
        ></div>
      )}
    </nav>
  );
};

export default NavbarComponent;
