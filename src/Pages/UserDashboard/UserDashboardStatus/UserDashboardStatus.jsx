import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../App";
import { AuthContext } from "../../../contexts/AuthProvider";

const UserDashboardStatus = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [dashboardStatus, setDashboardStatus] = useState({});

  useEffect(() => {
    fetch(`
https://subidha-home-services-server3792.glitch.me/user-bookings-reviews/${user.uid}`)
      .then((res) => res.json())
      .then((data) => setDashboardStatus(data));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        className={`card ${
          theme === "light" ? "bg-white" : "bg-[#24303F] border-slate-600"
        } shadow-md border rounded-lg`}
      >
        <div className="card-body p-6 flex-row justify-between">
          <div
            className="flex h-11 w-11 rounded-full items-center justify-center 
            bg-[#345DA7] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="card-title text-2xl">
              {dashboardStatus.totalBookings}
            </h2>
            <span className="font-semibold  text-sm">Bookings</span>
          </div>
        </div>
      </div>
      <div
        className={`card ${
          theme === "light" ? "bg-white" : "bg-[#24303F] border-slate-600"
        } shadow-md border rounded-lg`}
      >
        <div className="card-body p-6 flex-row justify-between">
          <div
            className="flex h-11 w-11 rounded-full items-center justify-center 
              bg-[#345DA7] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="card-title text-2xl">
              {dashboardStatus.totalReviews}
            </h2>
            <span className="font-semibold  text-sm">Reviews</span>
          </div>
        </div>
      </div>
      <div
        className={`card ${
          theme === "light" ? "bg-white" : "bg-[#24303F] border-slate-600"
        } shadow-md border rounded-lg`}
      >
        <div className="card-body p-6 flex-row justify-between">
          <div
            className="flex h-11 w-11 rounded-full items-center justify-center 
            bg-[#345DA7] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="card-title text-2xl">0</h2>
            <span className="font-semibold  text-sm">Notifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardStatus;
