import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/logo/subidha-logo.png";
import { Link } from "react-router-dom";
import { PromoBarContext, ThemeContext } from "../../../App";

const PromoBar = () => {
  const { theme } = useContext(ThemeContext);
  const {isVisible, setIsVisible} = useContext(PromoBarContext)

  const handleClose = () => {
    // Update state and store in local storage when the user closes the promo bar
    setIsVisible(false);
    localStorage.setItem("promoBarClosed", "true");
  };

  return (
    <>
      {isVisible && (
        <section className="relative">
          <div className="xl:max-w-screen-xl mx-auto flex justify-between items-center gap-10 flex-col relative xl:flex-row px-4 py-8">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img className="h-24" src={logo} alt="" />
            </Link>
            <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
              <div
                className={`flex md:block flex-col ${
                  theme === "light" && "text-stone-600"
                } items-center`}
              >
                <div className="flex items-center gap-8 flex-wrap justify-between">
                  <div className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>

                    <div>
                      <h6 className="text-start font-semibold">
                        Please Make a call
                      </h6>
                      <p className="text-sm font-semibold">+8801943-104565</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <div>
                      <h6 className="text-start font-semibold">
                        subidhaservice@gmail.com
                      </h6>
                      <p className="text-sm font-semibold">
                        Hour: 09:00am - 4:00pm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <div>
                      <h6 className="text-start font-semibold">Address</h6>
                      <p className="text-sm font-semibold">
                        House 454, Road No: 31, <br />
                        Mohakhali DOHS, Dhaka
                      </p>
                    </div>
                  </div>
                  <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95">
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-circle absolute right-4 top-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </section>
      )}
    </>
  );
};

export default PromoBar;
