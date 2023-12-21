import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Display from "../Display/Display";
import { Outlet, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile/my-hub');
  }, []);

  return (
    <div className="my-14">
      <div className="xl:max-w-screen-xl mx-auto flex lg:min-h-[60vh]">
        <Sidebar />
        <div className="grow">
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
