import React, { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ServiceFAQ from "./ServiceFAQ/ServiceFAQ";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import Details from "./Details/Details";
import { Link } from "react-scroll";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { DeviceContext } from "../../App";

const ServiceDetails = () => {
  const { device } = useContext(DeviceContext);
  const { subCategory, serviceOverview, faq } = useLoaderData();
  console.log(serviceOverview);
  console.log(subCategory);

  useEffect(() => {
    // Set the desired scroll position when the component is mounted
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
        <ul className="menu bg-base-200 lg:menu-vertical rounded-box h-fit shadow-xl border text-sm font-semibold sticky top-4">
          <li>
            <Link to="service-overview" smooth={true} duration={500}>
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Service Overview
            </Link>
          </li>
          <li>
            <Link to="faq" smooth={true} duration={500}>
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
              FAQ
              <span className="badge badge-sm badge-warning">NEW</span>
            </Link>
          </li>
          <li>
            <Link to="details" smooth={true} duration={500}>
              <DocumentMagnifyingGlassIcon className="h-5 w-5" />
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
