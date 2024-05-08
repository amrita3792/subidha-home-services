import { useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { MountContext } from "../../../Layout/Main/Main";

const AllServices = ({ setIsMounted }) => {
  const status = useContext(MountContext);

  useEffect(() => {
    status.setIsMounted(true);
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
