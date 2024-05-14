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
import UserDashboardStatus from "../../Pages/UserDashboard/UserDashboardStatus/UserDashboardStatus";
import UserProfile from "../../Pages/UserDashboard/UserProfile/UserProfile";
import UserBookings from "../../Pages/UserDashboard/UserBookings/UserBookings";
import BookingDetails from "../../Pages/UserDashboard/BookingDetails/BookingDetails";
import ProviderDashboard from "../../Pages/ProviderDashboard/ProviderDashboard/ProviderDashboard";
import ProviderDashboardStatus from "../../Pages/ProviderDashboard/ProviderDashboardStatus/ProviderDashboardStatus";
import AdminRoute from "./AdminRoute/AdminRoute";
import ServiceProviderProfile from "../../Pages/ServiceProviderProfile/ServiceProviderProfile/ServiceProviderProfile";
import ProviderRoute from "./ProviderRoute/ProviderRoute";
import ProviderBookings from "../../Pages/ProviderDashboard/ProviderBookings/ProviderBookings";
import UserReviews from "../../Pages/UserDashboard/UserReviews/UserReviews";

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
        path: "/provider-profile/:id",
        element: <ServiceProviderProfile />,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/provider-details/${params.id}`);
        },
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/user-dashboard/dashboard",
            element: <UserDashboardStatus />,
          },
          {
            path: "/user-dashboard/user-settings",
            element: <UserProfile />,
          },
          {
            path: "/user-dashboard/booking-list",
            element: <UserBookings />,
          },
          {
            path: "/user-dashboard/booking-list/:id",
            element: <BookingDetails />,
            loader: ({ params }) =>
              fetch(
                `https://subidha-home-services-server3792.glitch.me/booking-details/${params.id}`
              ),
          },
          {
            path: "/user-dashboard/user-reviews",
            element: <UserReviews />
          }
        ],
      },
      {
        path: "/provider-dashboard",
        element: (
          <ProviderRoute>
            <ProviderDashboard />
          </ProviderRoute>
        ),
        children: [
          {
            path: "/provider-dashboard/dashboard",
            element: <ProviderDashboardStatus />,
          },
          {
            path: "/provider-dashboard/booking-list",
            element: <ProviderBookings />,
          },
          {
            path: "/provider-dashboard/profile-settings",
            element: <UserProfile />,
          },
          
        ],
      },
      {
        path: "/service-details/:categoryId/:subCategoryId",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const categoryId = params.categoryId;
          const subCategoryId = params.subCategoryId;
          return fetch(
            `https://subidha-home-services-server3792.glitch.me/subcategory/${categoryId}/${subCategoryId}`
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
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
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
