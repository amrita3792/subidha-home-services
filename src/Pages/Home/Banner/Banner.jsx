import React from "react";
import electrician from "../../../assets/Banner/pngegg.png";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section className="lg:h-[650px]  bg-gradient-to-r to-emerald-500 from-emerald-900 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto h-full pt-12 px-5">
        <div className="basis-6/12">
          <h2 className="text-6xl font-bold text-white leading-snug">
            SOLUTION FOR ALL HOME SERVICES
          </h2>
          <p className="text-white font-medium my-4">
            Experience the ultimate in home service convenience with Subidha.
            Your satisfaction is our priority, and we're here to turn your home
            service needs into stress-free solutions. Explore the endless
            possibilities today!
          </p>
          <button className="border-2 text-white font-medium px-8 py-4 rounded-lg active:scale-95">
            More Information
          </button>
        </div>
        <div className="h-full flex items-end grow">
          <img className="h-full" src={electrician} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
