import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useProvider from '../../../hooks/useProvider';

const ProviderRoute = ({ children }) => {
    const {loading, user} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useProvider(user?.uid);
    const location = useLocation();
    
    if(loading || isAdminLoading) {
        return <div className="flex justify-center my-24">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if(user && isAdmin) {
        return children;
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProviderRoute;