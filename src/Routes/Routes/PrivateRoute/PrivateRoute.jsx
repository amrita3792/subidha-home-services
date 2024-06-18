import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import loader from '../../../assets/images/Square Loader.gif';

const PrivateRoute = ({ children }) => {
    const {loading, user} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading) {
         return <div className="flex justify-center items-center h-[100vh]">
            <img className="w-32" src={loader} alt="" />
        </div>;
    }

    if(user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;