

import { Outlet } from "react-router-dom";
// import AdminLinks from "./AdminLinks/AdminLinks";
import Header from "../../AdminDashboard/Header/Header";
import ProviderSidebar from "../ProviderSidebar/ProviderSidebar";
import ProviderNavbar from "../ProviderNavbar/ProviderNabar";

const ProviderDashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-dashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#F1F5F9]">
        <ProviderNavbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side z-[3000]">
        <label
          htmlFor="admin-dashboard"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ProviderSidebar />
      </div>
    </div>
  );
};

export default ProviderDashboard;
