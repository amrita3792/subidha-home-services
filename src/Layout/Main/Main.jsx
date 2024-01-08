import React, { createContext, useState } from "react";
import PromoBar from "../../Pages/Shared/PromoBar/PromoBar";
import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

export const MountContext = createContext();

const Main = () => {
  const [isMounted, setIsMounted] = useState(false);
  return (
    <main>
      <PromoBar />
      <MountContext.Provider value={{ isMounted, setIsMounted }}>
        <header>
          <Navbar isMounted={isMounted} />
        </header>
        <main>
          <Outlet />
        </main>
      </MountContext.Provider>
      <Footer />
    </main>
  );
};

export default Main;
