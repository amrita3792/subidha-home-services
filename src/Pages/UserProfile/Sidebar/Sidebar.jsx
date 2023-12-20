import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { DocumentMagnifyingGlassIcon, FireIcon, MapIcon, MapPinIcon, TrophyIcon, UserIcon, WalletIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
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
      path: "/hot-deals",
      icon: <FireIcon className="h-5 w-5" />
    },
    {
      id: 5,
      name: "My Service Trials",
      path: "/service-trials",
      icon: <DocumentMagnifyingGlassIcon className="h-5 w-5" />

    },
    {
      id: 6,
      name: "My Service Vouchers",
      path: "service-vouchers",
      icon: <WalletIcon className="h-5 w-5" />
    },
  ];
  return (
    <div className="basis-3/12 border-e">
      <ul className="link-container">
        {profileLinks.map((profileLink) => (
          <li key={profileLink.id}>
            <NavLink className="flex items-center gap-3 hover:underline" to={profileLink.path}>
              {({ isActive, isPending }) => (
                <>
                  {profileLink.icon}
                  <span className={isActive ? "active" : ""}>
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
