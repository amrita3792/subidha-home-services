import React from "react";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";

const ServiceLocation = ({ links }) => {
  return (
    <div className="p-5">
      <Breadcrumbs
        links={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "My Service Locations",
            path: "/profile/service-locations",
          },
        ]}
      />
    </div>
  );
};

export default ServiceLocation;
