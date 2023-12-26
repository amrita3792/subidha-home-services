import React from "react";
import { useLoaderData } from "react-router-dom";
import ServiceFAQ from "./ServiceFAQ/ServiceFAQ";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import Details from "./Details/Details";

const ServiceDetails = () => {
  const { subCategory, serviceOverview, faq } = useLoaderData();
  console.log(serviceOverview)
  console.log(subCategory)
  // console.log(data);
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
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Service Overview
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                FAQ
                <span className="badge badge-sm badge-warning">NEW</span>
              </a>
            </li>
            <li>
              <a>
                Details
                <span className="badge badge-xs badge-info"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex mt-7">
        <div className="basis-3/5">
          <ServiceOverview serviceOverview={serviceOverview}/>
          <ServiceFAQ faq={faq} />
          <Details details={subCategory.details} />
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ServiceDetails;
