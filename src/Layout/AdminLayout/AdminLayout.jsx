import React, { useContext } from "react";
import AdminDashboard from "../../Pages/AdminDashboard/AdminDashboard";
import useAdmin from "../../hooks/useAdmin";
import { AuthContext } from "../../contexts/AuthProvider";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.uid);
  // console.log(isAdmin);
  return <> <AdminDashboard /></>;
};

export default AdminLayout;
