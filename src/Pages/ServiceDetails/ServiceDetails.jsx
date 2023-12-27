import React, { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ServiceFAQ from "./ServiceFAQ/ServiceFAQ";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import Details from "./Details/Details";
import { Link } from "react-scroll";
import { DeviceContext } from "../../App";

const ServiceDetails = () => {
  const { device } = useContext(DeviceContext);
  const { subCategory, serviceOverview, faq } = useLoaderData();
  console.log(serviceOverview);
  console.log(subCategory);

  useEffect(() => {
    if (device.isSmallDevice || device.isMediumDevice) {
      window.scrollTo({
        top: 574,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  return (
    <section className="xl:max-w-screen-xl mx-auto my-10">
      <div className="relative">
        <img
          className="h-[400px] w-full rounded-xl"
          src={subCategory.image}
          alt=""
        />
        <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full rounded-xl"></div>
        <div className="absolute z-50 top-8 left-8">
          <h2 className="text-4xl font-semibold mb-4 text-white">
            {subCategory?.serviceName}
          </h2>
        </div>
      </div>
      <div className="flex mt-7 gap-5">
        <ul className="menu bg-base-200 lg:menu-vertical rounded-box h-fit shadow-lg border text-sm font-semibold sticky top-4">
          <li>
            <Link to="service-overview" smooth={true} duration={500}>
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
              Service Overview
            </Link>
          </li>
          <li>
            <Link to="faq" smooth={true} duration={500}>
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
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              FAQ
              <span className="badge badge-sm badge-warning">NEW</span>
            </Link>
          </li>
          <li>
            <Link to="details" smooth={true} duration={500}>
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              Details
              <span className="badge badge-xs badge-info"></span>
            </Link>
          </li>
        </ul>
        <div className="basis-3/5">
          <ServiceOverview
            name="service-overview"
            serviceOverview={serviceOverview}
          />
          <ServiceFAQ name="faq" faq={faq} />
          <Details name="details" details={subCategory.details} />
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
