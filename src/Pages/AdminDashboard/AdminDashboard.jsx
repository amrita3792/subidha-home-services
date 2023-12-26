import React, { useContext } from "react";
import Header from "./Header/Header";
import { Link } from "react-router-dom";
import AdminLinks from "./AdminLinks/AdminLinks";


const AdminDashboard = () => {

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-dashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
      </div>
      <div className="drawer-side">
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
