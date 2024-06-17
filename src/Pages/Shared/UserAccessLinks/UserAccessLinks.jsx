import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { AdminContext, ProviderContext, ThemeContext } from "../../../App";
import useAdmin from "../../../hooks/useAdmin";
import useProvider from "../../../hooks/useProvider";

const UserAccessLinks = ({ isOpen, setIsOpen }) => {
  const { user, logout} = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  // const [isProvider, isProviderLoading] = useProvider(user?.uid);
  const {isProvider, isProviderLoading} = useContext(ProviderContext);
  const {isAdmin, isAdminLoading} = useContext(AdminContext);

  const profileLinks = [
    {
      id: 1,
      name: "User Dashboard",
      path: "/user-dashboard/dashboard",
    },
    {
      id: 2,
      name: "My Bookings",
      path: "user-dashboard/booking-list",
    },
    {
      id: 3,
      name: "Profile Settings",
      path: "/user-dashboard/user-settings",
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
      id: 7,
      name: "Get Jobs",
      path: "/get-jobs",
    },
    {
      id: 6,
      name: "Chat",
      path: "/user-chat",
    },
  ];

  const handleLogout = () => {
    setLoading(true);
    const status = "Offline";
    fetch(
      `https://subidha-home-services-server3792.glitch.me/update-status/${user.uid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          logout()
            .then(() => {
              setLoading(false);
              setIsOpen(false);
            })
            .catch((error) => {
              console.error(`Error: ${error}`);
            });
        }
      });
  };

  return (
    isOpen && (
      <>
        <div
          onClick={(e) => {
            setIsOpen(true);
            e.stopPropagation();
          }}
          className={`absolute -right-3 top-12 border  ${
            theme === "dark"
              ? "bg-[#1D232A] border-slate-600"
              : "bg-white border-gray-300"
          }  py-4 px-5 rounded-xl w-[300px] z-[30001]`}
        >
          <div className="flex items-center gap-3 mb-3">
            {user?.photoURL ? (
              <img
                className="rounded-full h-12 w-12"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <img
                className="h-12 w-12"
                src="https://i.ibb.co/M1qvZxP/user.png"
                alt=""
              />
            )}
            <div>
              <p className="font-semibold line-clamp-0 text-start">
                {user?.displayName ? user.displayName : "N/A"}
              </p>
              <p className="text-sm text-start">User</p>
            </div>
          </div>

          <ul className="flex flex-col items-start gap-3 w-[150px]">
            {isAdmin && (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <Link
                  to="/admin-dashboard"
                  className="text-sm font-semibold hover:underline text-start"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}

            {isAdminLoading && (
              <li className="flex  w-full">
                <div className="skeleton h-4 w-28"></div>
              </li>
            )}
            {isProvider && (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <Link
                  to="/provider-dashboard/dashboard"
                  className="text-sm font-semibold hover:underline text-start"
                >
                  Provider Dashboard
                </Link>
              </li>
            )}
            {isProviderLoading && (
              <li className="flex  w-full">
                <div className="skeleton h-4 w-28"></div>
              </li>
            )}
            {profileLinks.map((profileLink) => (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                key={profileLink.id}
              >
                <Link
                  to={profileLink.path}
                  className="text-sm font-semibold hover:underline text-start"
                >
                  {profileLink.name}
                </Link>
              </li>
            ))}
            <li
              onClick={(e) => {
                // e.stopPropagation();
                handleLogout();
              }}
              className="btn flex items-center justify-center gap-1 cursor-pointer bg-[#FF6600] hover:bg-[#1D2736]  px-3 py-2 rounded-lg"
            >
              {loading && (
                <span className="loading loading-spinner loading-sm text-white"></span>
              )}
              <span className="text-white">Logout</span>
              <span>
                <ArrowDownTrayIcon className="w-6 h-6 rotate-90 text-white" />
              </span>
            </li>
          </ul>
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false)
            }}
            className="btn btn-circle bg-inherit border-none absolute top-2 right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>
        <div className="fixed left-0 top-0 h-screen w-screen z-[4999]"></div>
      </>
    )
  );
};

export default UserAccessLinks;
