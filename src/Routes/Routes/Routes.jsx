import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import UserProfile from "../../Pages/UserProfile/UserProfile/UserProfile";
import MyHub from "../../Pages/UserProfile/MyHub/MyHub";

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
                        path: '/profile',
                        element: <MyHub />
                    }
                ]
            }
        ]
        
    }
]);

export default router;