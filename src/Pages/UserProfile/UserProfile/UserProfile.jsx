import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Display from "../Display/Display";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile/my-hub');
  }, []);

  return (
    <div className="my-14">
      <div className="xl:max-w-screen-xl mx-auto flex min-h-[60vh]">
        <Sidebar />
        <Display />
      </div>
    </div>
  );
};

export default UserProfile;
