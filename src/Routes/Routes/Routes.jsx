import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import UserProfile from "../../Pages/UserProfile/UserProfile/UserProfile";
import MyHub from "../../Pages/UserProfile/MyHub/MyHub";
import ServiceLocation from "../../Pages/UserProfile/ServiceLocations/ServiceLocation";
import ServiceRewards from "../../Pages/UserProfile/ServiceRewards/ServiceRewards";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/profile',
                element: <UserProfile />,
                children: [
                    {
                        path: '/profile/my-hub',
                        element: <MyHub />
                    },
                    {
                        path: '/profile/service-locations',
                        element: <ServiceLocation />
                    },
                    {
                        path: '/profile/service-rewards',
                        element: <ServiceRewards />
                    }
                ]
            },
            
        ]
        
    }
]);

export default router;