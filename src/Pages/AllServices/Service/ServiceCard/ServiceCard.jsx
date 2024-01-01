import React from "react";

const ServiceCard = ({ service, subCategory, handleDetailsButtonClick }) => {
  return (
    <div onClick={() => handleDetailsButtonClick(service, subCategory.id)} className="card bg-base-100 cursor-pointer tooltip" data-tip="See Details">
      <figure>
        <img
          src={subCategory.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title text-lg">{subCategory.serviceName}</h2>
        <div className="">
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
