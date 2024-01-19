import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AllServices from "../../Pages/AllServices/AllServices/AllServices";
import ServiceDetails from "../../Pages/ServiceDetails/ServiceDetails";
import AdminLayout from "../../Layout/AdminLayout/AdminLayout";
import Dashboard from "../../Pages/AdminDashboard/Dashboard/Dashboard/Dashboard";
import Users from "../../Pages/AdminDashboard/Users/Users/users";
import GetJobs from "../../Pages/GetJobs/GetJobs/GetJobs";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UserDashboard from "../../Pages/UserDashboard/UserDashboard/UserDashboard";
import UDashboard from "../../Pages/UserDashboard/UDashboard/UDashboard";
import UserProfile from "../../Pages/UserDashboard/UserProfile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/all-services",
        element: <AllServices />,
      },
      {
        path: "/user-dashboard",
        element: <PrivateRoute><UserDashboard /></PrivateRoute>,
        children: [
          {
            path: "/user-dashboard",
            element: (
              <div className="flex flex-col items-center">
                <div role="alert" className="alert bg-inherit flex flex-col max-w-[500px] text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">
                      "Welcome! To access all the features of your home
                      dashboard, click on the menu icon in the left side."
                    </h3>
                  </div>
                </div>
              </div>
            ),
          },
          {
            path: "/user-dashboard/dashboard",
            element: <UDashboard />,
          },
          {
            path: "/user-dashboard/user-settings",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "/service-details/:categoryId/:subCategoryId",
        element: <ServiceDetails />,
        loader: async ({ params }) => {
          const categoryId = params.categoryId;
          const subCategoryId = params.subCategoryId;
          return fetch(
            `http://localhost:5000/subcategory/${categoryId}/${subCategoryId}`
          );
        },
      },
      {
        path: "/get-jobs",
        element: (
          <PrivateRoute>
            <GetJobs />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin-dashboard/users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
