import React from "react";
import ServiceCard from "./ServiceCard/ServiceCard";

const Service = ({ service, handleDetailsButtonClick }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold">{service?.serviceName}</h2>
      <h4 className="font-bold">
        {service?.subCategories?.length} Related Services
      </h4>
      <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-10 my-10">
        {service?.subCategories?.map((subCategory) => (
          <ServiceCard
            handleDetailsButtonClick={handleDetailsButtonClick}
            service={service}
            subCategory={subCategory}
            key={subCategory.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
