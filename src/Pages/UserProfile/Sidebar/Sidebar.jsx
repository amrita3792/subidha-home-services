import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { DocumentMagnifyingGlassIcon, FireIcon, MapIcon, MapPinIcon, TrophyIcon, UserIcon, WalletIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../../../App";

const Sidebar = () => {
  const {theme} = useContext(ThemeContext);
  const profileLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/profile/my-hub",
      icon: <UserIcon className="w-6 h-6" />,
    },
    {
      id: 2,
      name: "My Service Locations",
      path: "/profile/service-locations",
      icon: <MapPinIcon className="w-6 h-6" />
    },
    {
      id: 3,
      name: "My Service Rewards",
      path: "/profile/service-rewards",
      icon: <TrophyIcon className="w-6 h-6" />
    },
    {
      id: 4,
      name: "My Hot Deals",
      path: "/profile/hot-deals",
      icon: <FireIcon className="h-5 w-5" />
    },
    {
      id: 5,
      name: "My Service Trials",
      path: "/profile/service-trials",
      icon: <DocumentMagnifyingGlassIcon className="h-5 w-5" />

    },
    {
      id: 6,
      name: "My Service Vouchers",
      path: "/profile/service-vouchers",
      icon: <WalletIcon className="h-5 w-5" />
    },
  ];
  return (
    <div className={`hidden lg:block relative basis-[280px] border-e ${theme === "dark" ? "border-gray-500" : "dark:border-gray-300 md"}`}>
      <ul className="link-container">
        {profileLinks.map((profileLink) => (
          <li key={profileLink.id}>
            <NavLink className="flex items-center gap-3 hover:underline" to={profileLink.path}>
              {({ isActive, isPending }) => (
                <>
                  {profileLink.icon}
                  <span className={isActive ? "active" : "Link"}>
                    {profileLink.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
