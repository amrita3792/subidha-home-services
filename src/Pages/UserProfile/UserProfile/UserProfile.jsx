import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Display from "../Display/Display";

const UserProfile = () => {
  return (
    <div className="mt-14">
      <div className="xl:max-w-screen-xl mx-auto flex min-h-[60vh]">
        <Sidebar />
        <Display />
      </div>
    </div>
  );
};

export default UserProfile;
