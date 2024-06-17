
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
  
    return (
        <div className="max-w-screen-xl mx-auto px-4 my-5 md:my-14 flex gap-10 flex-wrap lg:flex-nowrap">
            <Sidebar />
            <div className="grow overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;