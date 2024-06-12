import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const {loading, user, logout} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.uid);
    const location = useLocation();
    
    if(loading || isAdminLoading) {
        return <div className="flex justify-center my-24">
            <span className="loading loading-spinner loading-lg"></span>
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