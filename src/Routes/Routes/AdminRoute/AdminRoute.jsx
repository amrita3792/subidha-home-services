import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import loader from '../../../assets/images/Square Loader.gif';

const AdminRoute = ({ children }) => {
    const {loading, user, logout} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.uid);
    const location = useLocation();
    
    if(loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-[100vh]">
            <img className="w-32" src={loader} alt="" />
        </div>;
    }

    if(user && isAdmin) {
        return children;
    }
    
    else {
        logout();
        return <Navigate to="/login" state={{ from: location }} replace />
    }
};

export default AdminRoute;