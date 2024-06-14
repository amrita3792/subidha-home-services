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
import ProviderServices from "../../Pages/ProviderDashboard/ProviderServices/ProviderServices/ProviderServices";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import PaymentSuccess from "../../Pages/Payment/PaymentSuccess/PaymentSuccess";
import Payment from "../../Pages/UserDashboard/Payment/Payment";
import Invoices from "../../Pages/UserDashboard/Invoices/Invoices";
import ProviderInvoices from "../../Pages/ProviderDashboard/ProviderInvoices/ProviderInvoices";
import ProviderPayments from "../../Pages/ProviderDashboard/ProviderPayments/ProviderPayments";
import ProviderReviews from "../../Pages/ProviderDashboard/ProviderReviews/ProviderReviews";
import Staffs from "../../Pages/ProviderDashboard/Staffs/Staffs";
import Availability from "../../Pages/ProviderDashboard/Availability/Availability";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DisplayError />,
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
          return fetch(`
https://subidha-home-services-server3792.glitch.me/provider-details/${params.id}`);
        },
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
        errorElement: <DisplayError />,
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
            element: <UserReviews />,
          },
          {
            path: "/user-dashboard/user-payment",
            element: <Payment />
          },
          {
            path: "/user-dashboard/user-invoices",
            element: <Invoices />
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
        errorElement: <DisplayError />,
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
            path: "/provider-dashboard/my-services",
            element: <ProviderServices />,
          },
          {
            path: "/provider-dashboard/profile-settings",
            element: <UserProfile />,
          },
          {
            path: "/provider-dashboard/provider-invoices",
            element: <ProviderInvoices />
          },
          {
            path: "/provider-dashboard/provider-payment",
            element: <ProviderPayments />
          },
          {
            path: "/provider-dashboard/provider-reviews",
            element: <ProviderReviews />
          },
          {
            path: "/provider-dashboard/staffs",
            element: <Staffs />
          },
          {
            path: "/provider-dashboard/provider-availability",
            element: <Availability />
          }
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
    errorElement: <DisplayError />,
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
  {
    path: "/payment/success/:tran",
    element: <PaymentSuccess />,
  },
]);

export default router;
