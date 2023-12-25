import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../Service/Service";
import { ThemeContext } from "../../../App";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [service, setService] = useState(null);
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    if (serviceCategories[0]?._id) {
      fetch(
        `http://localhost:5000/allServiceCategories/${
          serviceId ? serviceId : serviceCategories[0]._id
        }`
      )
        .then((res) => res.json())
        .then((data) => setService(data));
    }
  }, [serviceId]);

  const { data: serviceCategories = [], isLoading } = useQuery({
    queryKey: ["allServiceCategory"],
    queryFn: () =>
      fetch("http://localhost:5000/allServiceCategories").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return;
  }

  console.log("Hello");

  if (!serviceId && serviceCategories[0]?._id) {
    setServiceId(serviceCategories[0]?._id);
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content py-10 px-8">
        {serviceId && <Service service={service} />}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className={`menu p-4 w-80 min-h-full ${theme === "light"? "bg-white" : "bg-bage-200 border-gray-600"} text-base-content gap-2  border-e`}>
          <li className="text-2xl font-semibold px-4 pt-10 pb-5">
            ALL SERVICES
          </li>
          {/* Sidebar content here */}
          {serviceCategories.map((serviceCategory) => (
            <li
              onClick={() => setServiceId(serviceCategory._id)}
              className="font-semibold"
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
