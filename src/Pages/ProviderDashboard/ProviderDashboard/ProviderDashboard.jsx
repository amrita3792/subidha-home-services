

import { Outlet } from 'react-router-dom';
import ProviderSidebar from '../ProviderSidebar/ProviderSidebar';


const ProviderDashboard = () => {
  
    return (
        <div className="max-w-screen-xl mx-auto px-4 my-5 md:my-14 flex gap-10 flex-wrap lg:flex-nowrap">
            <ProviderSidebar />
            <div className="grow relative">
                <Outlet />
            </div>
        </div>
    );
};

export default ProviderDashboard;