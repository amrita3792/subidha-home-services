import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AllServices from "../../Pages/AllServices/AllServices/AllServices";
import ServiceDetails from "../../Pages/ServiceDetails/ServiceDetails";

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
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/all-services',
                element: <AllServices />
            },
            {
                path: '/service-details/:categoryId/:subCategoryId',
                element: <ServiceDetails />,
                loader: async({params}) => {
                    const categoryId = params.categoryId;
                    const subCategoryId = params.subCategoryId;
                    console.log(categoryId);
                    console.log(subCategoryId)
                    return fetch(`http://localhost:5000/subcategory/${categoryId}/${subCategoryId}`)
                }
            }
            
        ]
        
    }
]);

export default router;