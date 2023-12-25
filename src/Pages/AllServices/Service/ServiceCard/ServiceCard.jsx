import React from "react";

const ServiceCard = ({ service, subCategory, handleDetailsButtonClick }) => {
//   console.log(service);
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={subCategory.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{subCategory.serviceName}</h2>
        <p className="text-sm font-semibold">{subCategory.description.length > 70 ? subCategory.description.slice(0, 70) + "..." : subCategory.description}</p>
        <div className="card-actions justify-end">
          <button onClick={() => handleDetailsButtonClick(service, subCategory.id)} className="btn bg-gradient-to-r from-[#10e2ee] to-[#04ffa3]">Details</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
