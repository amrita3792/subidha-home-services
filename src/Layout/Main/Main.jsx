import React from 'react';
import PromoBar from '../../Pages/Shared/PromoBar/PromoBar';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../../Pages/Shared/NavbarComponent/NavbarComponent';
import Footer from '../../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div className="min-h-full">
            <PromoBar />
            <NavbarComponent />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;