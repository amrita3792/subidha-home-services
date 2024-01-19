import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/user-dashboard/dashboard')
    }, []);
    return (
        <div className="max-w-screen-xl mx-auto px-5 my-14 flex gap-10 flex-wrap lg:flex-nowrap">
            <Sidebar />
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;