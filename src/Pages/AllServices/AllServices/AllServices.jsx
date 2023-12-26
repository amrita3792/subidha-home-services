import React, { useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useMediaQuery } from "react-responsive";
import { AuthContext } from "../../../contexts/AuthProvider";
import { DeviceContext } from "../../../App";
import { MountContext } from "../../../Layout/Main/Main";

const AllServices = ({ setIsMounted }) => {
  const { device } = useContext(DeviceContext);
  const status = useContext(MountContext);
  //   console.log(value);

  useEffect(() => {
    status.setIsMounted(true);
    // Set the desired scroll position when the component is mounted
    if (device.isSmallDevice || device.isMediumDevice) {
      window.scrollTo({
        top: 574,
        behavior: "smooth",
      });
    }
    return () => {
      status.setIsMounted(false);
    };
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div className="xl:max-w-screen-xl relative z-[1000] mx-auto">
      <Sidebar />
    </div>
  );
};

export default AllServices;
