import { DocumentMagnifyingGlassIcon, FireIcon, MapPinIcon, TrophyIcon, UserIcon, WalletIcon } from "@heroicons/react/24/solid";

export const profileLinks = [
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

