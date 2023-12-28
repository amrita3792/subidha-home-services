import React from "react";

const ServiceCard = ({ service, subCategory, handleDetailsButtonClick }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={subCategory.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title">{subCategory.serviceName}</h2>
        <p className="text-sm font-semibold">{subCategory.description.length > 70 ? subCategory.description.slice(0, 70) + "..." : subCategory.description}</p>
        <div className="">
          <button onClick={() => handleDetailsButtonClick(service, subCategory.id)} className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-3 py-1 font-medium">See Details</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
