import React from "react";

const ServiceCard = ({ service }) => {
  console.log(service);
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={service.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{service.serviceName}</h2>
        <p className="text-sm font-semibold">{service.description.length > 70 ? service.description.slice(0, 70) + "..." : service.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
