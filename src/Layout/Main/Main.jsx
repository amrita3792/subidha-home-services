import React, { createContext, useState } from "react";
import PromoBar from "../../Pages/Shared/PromoBar/PromoBar";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../Pages/Shared/NavbarComponent/NavbarComponent";
import Footer from "../../Pages/Shared/Footer/Footer";

export const MountContext = createContext();

const Main = () => {
  const [isMounted, setIsMounted] = useState(false);
  return (
    <div>
      <PromoBar />
      <MountContext.Provider value={{isMounted, setIsMounted}}>
        <NavbarComponent isMounted={isMounted} />
        <Outlet />
      </MountContext.Provider>
      <Footer />
    </div>
  );
};

export default Main;
