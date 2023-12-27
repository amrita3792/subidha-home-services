import React from "react";
import electrician from "../../../assets/Banner/pngegg.png";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section
      id={styles.cover}
      className="lg:h-[650px]  bg-gradient-to-r to-blue-600 from-violet-600 overflow-hidden relative"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto h-full pt-12 px-5 relative z-50">
        <div className="basis-6/12">
          <h2 className="text-6xl font-bold leading-snug">
            SOLUTION FOR ALL{" "}
            <span className="text-[#FFA51D]">HOME SERVICES</span>
          </h2>
          <p className="font-medium my-4">
            Experience the ultimate in home service convenience with Subidha.
            Your satisfaction is our priority, and we're here to turn your home
            service needs into stress-free solutions. Explore the endless
            possibilities today!
          </p>
          <button className="btn border-none hover:bg-[#FFA51D] bg-[#393CC6] text-white px-8 py-4 active:scale-95 font-semibold">
            More Information
          </button>
        </div>
        <div className="h-full flex items-end justify-center grow relative">
          <img className="h-full relative z-50" src={electrician} alt="" />
          <div className="bg-[#393CC6] h-80 w-80 rounded-full absolute top-10 right-1/3 shadow-xl"></div>
          <div className="bg-[#FFA51D] h-12 w-12 rounded-full absolute top-10 right-1.5 shadow-xl"></div>
          <div className="bg-[#FFA51D] h-20 w-20 rounded-full absolute top-28 right-2.5 shadow-xl"></div>
        </div>
      </div>
      <div
        id={styles.overlay}
        className="absolute w-full h-full top-0 left-0"
      ></div>
    </section>
  );
};

export default Banner;

// #C026D3
// #DB2777
