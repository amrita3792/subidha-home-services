import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ArrowDownTrayIcon, UserIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../../../App";
import { toast } from "react-toastify";

const UserAccessLinks = ({ isOpen, setIsOpen }) => {
  const { user, logout, setLoading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const profileLinks = [
    {
      id: 1,
      name: "Dashboard",
      path: "/user-dashboard",
    },
    {
      id: 2,
      name: "My Bookings",
      path: "user-bookings",
    },
    {
      id: 3,
      name: "Profile Settings",
      path: "/user-settings",
    },
    {
      id: 4,
      name: "Book Service",
      path: "all-services",
    },
    {
      id: 5,
      name: "My Orders",
      path: "/user-orders",
    },
    {
      id: 6,
      name: "Chat",
      path: "/user-chat",
    },
  ];

  const handleLogout = () => {
    logout()
    .then(() => {
        toast.success("Successfully Logout", {
            hideProgressBar: true,
            theme: "colored"
          })
      }).catch((error) => {
        // An error happened.
        toast.error(error.message, {
            hideProgressBar: true,
            theme: "colored"
          })
        setLoading(false)
      });
  }

  return (
    isOpen && (
      <>
        <div
          onClick={(e) => {
            setIsOpen(true);
            e.stopPropagation();
          }}
          className={`absolute -right-3 top-12 border ${
            theme === "dark"
              ? "bg-[#1D232A] border-gray-700"
              : "bg-white border-gray-300"
          }  py-4 px-5 rounded-xl w-[250px] z-[5000]`}
        >
          <div className="flex items-center gap-3 mb-3">
            {user?.photoURL ? (
              <img
                className="rounded-full h-12 w-12"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white p-3 rounded-full relative">
                <UserIcon className="w-8 h-8" />
              </div>
            )}
            <div>
              <p className="font-semibold line-clamp-0">{user?.displayName ? user.displayName : "N/A"}</p>
              <span className="text-sm">User</span>
            </div>
          </div>

          <ul className="flex flex-col items-start gap-3  w-[150px]">
            {profileLinks.map((profileLink) => (
              <li key={profileLink.id}>
                <Link className="text-sm hover:underline text-start">
                  {profileLink.name}
                </Link>
              </li>
            ))}
            <li onClick={handleLogout} className="flex items-center justify-center gap-1 cursor-pointer bg-gradient-to-r from-slate-500 to-slate-800 hover:to-slate-500 hover:from-slate-800 text-white px-3 py-2 rounded-lg">
              <span>Logout</span>
              <span>
                <ArrowDownTrayIcon className="w-6 h-6 rotate-90" />
              </span>
            </li>
          </ul>
        </div>
        <div className="fixed left-0 top-0 h-screen w-screen z-[4999]"></div>
      </>
    )
  );
};

export default UserAccessLinks;
