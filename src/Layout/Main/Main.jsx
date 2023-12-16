import React from 'react';
import PromoBar from '../../Pages/Shared/PromoBar/PromoBar';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../../Pages/Shared/NavbarComponent/NavbarComponent';

const Main = () => {
    return (
        <div>
            <PromoBar />
            <NavbarComponent />
            <Outlet />
        </div>
    );
};

export default Main;