import React from "react";

const ServiceOverview = ({ serviceOverview }) => {
  console.log(serviceOverview);
  return (
    <div className="mt-5">
      <h2 name="service-overview" className="text-3xl font-semibold">
        Service Overview
      </h2>
      {serviceOverview.map((item, idx) => (
        <div className="mt-3" key={idx}>
          <h2 className="font-bold text-lg">{item.title}</h2>
          <ul className="ps-10" style={{ listStyleType: "disc" }}>
            {item.details.map((item, idx) => (
              <li className="text-base" key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceOverview;
