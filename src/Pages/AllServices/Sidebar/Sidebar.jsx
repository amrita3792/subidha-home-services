import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Service from "../Service/Service";
import { ThemeContext } from "../../../App";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [service, setService] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (serviceCategories[0]?._id) {
      fetch(
        `https://subidha-home-services-server2.glitch.me/allServiceCategories/${
          serviceId ? serviceId : serviceCategories[0]._id
        }`
      )
        .then((res) => res.json())
        .then((data) => setService(data));
    }
  }, [serviceId]);

  const {
    data: serviceCategories = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(),
  });

  const fetchUserData = async () => {
    const response = await fetch("https://subidha-home-services-server2.glitch.me/allServiceCategories", {
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  if (error) {
    toast.error("There was an error fetching services data.", {
      hideProgressBar: true,
      autoClose: false,
      theme: "colored",
    });
    return;
  }

  if (!serviceId && serviceCategories[0]?._id) {
    setServiceId(serviceCategories[0]?._id);
  }

  const handleDetailsButtonClick = (service, subCategoryId) => {
    navigate(`/service-details/${service._id}/${subCategoryId}`);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content py-5 md:py-10 px-4 lg:px-8">
        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(3).keys()].map((idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="skeleton h-60 w-full"></div>
                <div className="p-8 flex flex-col gap-3 items-center">
                  <div className="skeleton h-8 w-60 mb-3"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-10 rounded-none w-28 mt-5"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {serviceId && (
          <Service
            handleDetailsButtonClick={handleDetailsButtonClick}
            service={service}
          />
        )}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          className={`menu p-4 w-80 min-h-full ${
            theme === "light"
              ? "bg-white"
              : "bg-bage-200 border-slate-600 relative z-[30005]"
          } text-base-content gap-2  border-e`}
        >
          <li className="text-2xl md:text-3xl font-semibold px-4 md:mt-8">
            All Services
          </li>
          <div className="flex flex-col gap-5">
            {isLoading &&
              [...Array(12).keys()].map((idx) => (
                <div key={idx} className="skeleton h-4 w-[90%]"></div>
              ))}
          </div>
          {/* Sidebar content here */}
          {serviceCategories.map((serviceCategory) => (
            <li
              onClick={() => setServiceId(serviceCategory._id)}
              className="font-semibold text-base"
              key={serviceCategory._id}
            >
              <button>{serviceCategory.serviceName}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
