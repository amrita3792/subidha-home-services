import React, { useContext } from "react";
import location from "../../../assets/icons/location.png";
import email from "../../../assets/icons/email.png";
import telephone from "../../../assets/icons/phone-call.png";
import logo from "../../../assets/logo/subidha-logo.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../App";

const PromoBar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className="xl:max-w-screen-xl mx-auto flex justify-between items-center gap-10 flex-col  xl:flex-row my-8 px-4">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img className="h-12" src={logo} alt="" />
        <h2 className="text-[#FFA51D] text-4xl font-extrabold ">
          SUBIDHA
        </h2>
      </Link>
      <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
        <div
          className={`flex md:block flex-col ${
            theme === "light" && "text-stone-600"
          } items-center`}
        >
          <div className="flex items-center gap-8 justify-between">
            <div className="flex items-center gap-4">
              <img className="w-[25px]" src={telephone} alt="" />
              <div>
                <h6 className="text-start font-semibold">Please Make a call</h6>
                <p className="text-sm">+8801943-104565</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img className="w-[25px]" src={email} alt="" />
              <div>
                <h6 className="text-start font-semibold">
                  subidhaservice@gmail.com
                </h6>
                <p className="text-sm">Hour: 09:00am - 4:00pm</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img className="w-[25px]" src={location} alt="" />
              <div>
                <h6 className="text-start font-semibold">Address</h6>
                <p className="text-sm">
                  House 454, Road No: 31, <br />
                  Mohakhali DOHS, Dhaka
                </p>
              </div>
            </div>
            <button className="btn bg-[#FFA51D] hover:bg-[#393CC6] text-white px-10 py-2 active:scale-95">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBar;

//
