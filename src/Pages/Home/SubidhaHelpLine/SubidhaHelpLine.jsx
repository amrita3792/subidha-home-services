import React from "react";
import { Link } from "react-router-dom";

const SubidhaHelpLine = () => {
  return (
    <div className="bg-[#345DA7] relative px-4 py-48 ">
      <div className="xl:max-w-screen-xl relative z-[1000] mx-auto text-white flex">
        <div className="lg:basis-[50%]">
          <h2 className="text-4xl font-semibold mt-3 mb-5">
            HomeHelp 24/7: Your One-Stop Home Service Hotline – Dial 16516
          </h2>
          <Link to="/get-jobs">
            <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95 border-none">
              Request a service
            </button>
          </Link>
        </div>
      </div>
      <img
        className="absolute bottom-0 md:top-0 right-0 h-full lg:z-50"
        src="https://i.ibb.co/ncw5pPM/image-removebg-preview-1.png"
        alt=""
      />
      <div className="bg-black h-full w-full absolute top-0 left-0 opacity-20"></div>
    </div>
  );
};

export default SubidhaHelpLine;
