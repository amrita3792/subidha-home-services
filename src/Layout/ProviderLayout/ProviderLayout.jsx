import React, { createContext, useState } from "react";
import PromoBar from "../../Pages/Shared/PromoBar/PromoBar";
import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";
import ProviderDashboard from "../../Pages/ProviderDashboard/ProviderDashboard/ProviderDashboard";

export const MountContext = createContext();

const ProviderLayout = () => {
  const [isMounted, setIsMounted] = useState(false);
  return (
    <ProviderDashboard />
  );
};

export default ProviderLayout;
