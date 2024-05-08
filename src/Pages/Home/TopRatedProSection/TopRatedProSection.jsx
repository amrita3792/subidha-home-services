import React from "react";
import { Link } from "react-router-dom";

const TopRatedProSection = () => {
  return (
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto flex items-center gap-36 my-20">
      <div className="basis-[40%]">
        <p className="font-semibold text-[#FF6600]">Subidha Home Service</p>
        <h2 className="text-4xl font-semibold my-3">
          Join the Elite: Become a Top-Rated Pro with Subidha
        </h2>
        <p className="my-4">
          Craft your success with Handy: Where top-rated pros thrive. Join today
          for job opportunities without lead fees and flexible scheduling.
        </p>
        <Link to="/get-jobs">
          <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95 border-none">
            Become a pro
          </button>
        </Link>
      </div>
      <div className="basis-[60%]">
        <img
          className="w-full"
          src="https://i.ibb.co/pdgYmns/male-female-workers-wearing-work-clothes-removebg-preview-1.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default TopRatedProSection;
