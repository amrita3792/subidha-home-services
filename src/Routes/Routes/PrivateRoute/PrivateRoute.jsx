import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
    const {loading, user} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading) {
        return <div className="flex justify-center my-24">
            <progress className="progress w-56"></progress>
        </div>;
    }

    if(user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;