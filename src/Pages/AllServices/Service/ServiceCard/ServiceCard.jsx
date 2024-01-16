import React, { useContext } from "react";
import { ThemeContext } from "../../../../App";

const ServiceCard = ({ service, subCategory, handleDetailsButtonClick }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      onClick={() => handleDetailsButtonClick(service, subCategory.id)}
      className={`card bg-base-100 shadow-xl border ${
        theme === "dark" && "border-slate-600"
      } cursor-pointer tooltip`}
      data-tip="See Details"
    >
      <figure>
        <img src={subCategory.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl justify-center mb-3">
          {subCategory.serviceName}
        </h2>
        <div className="text-center mb-5">
          {subCategory.description.length > 300
            ? subCategory.description.slice(0, 300) + "..."
            : subCategory.description}
        </div>
        <div className="card-actions justify-center">
          <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white rounded-none px-10">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
