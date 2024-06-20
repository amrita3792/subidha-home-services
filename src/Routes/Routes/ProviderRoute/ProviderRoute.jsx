import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useProvider from "../../../hooks/useProvider";
import loader from "../../../assets/images/Square Loader.gif";
import Loader from "../../../Components/Loader/Loader";

const ProviderRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useProvider(user?.uid);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProviderRoute;
