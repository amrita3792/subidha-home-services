import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { data: allServiceCategories = [], isLoading } = useQuery({
    queryKey: ["allServiceCategory"],
    queryFn: () =>
      fetch("http://localhost:5000/allServiceCategories").then((res) =>
        res.json()
      ),
  });

  

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
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
        <ul className="menu p-4 w-80 min-h-full bg-white text-base-content gap-2  border-e">
            <li className="text-3xl font-semibold px-4 pt-10 pb-5">ALL SERVICES</li>
          {/* Sidebar content here */}
          {allServiceCategories.map((serviceCategory) => (
            <li className="text-lg" key={serviceCategory._id}>
              <button>{serviceCategory.serviceName}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
