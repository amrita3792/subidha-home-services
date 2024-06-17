
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import AdminLinks from "./AdminLinks/AdminLinks";

const AdminDashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-dashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#F1F5F9]">
        <Header />
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
        <AdminLinks />
      </div>
    </div>
  );
};

export default AdminDashboard;
