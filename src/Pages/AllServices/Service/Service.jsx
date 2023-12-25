import React from 'react';
import ServiceCard from './ServiceCard/ServiceCard';

const Service = ({service}) => {
    console.log(service);
    // const {serviceName, subCategories} = service;
    // console.log(serviceName)
    return (
        <div>
            <h2 className="text-3xl font-bold">{service?.serviceName}</h2>
            <h4 className="font-bold">{service?.subCategories?.length} Related Services</h4>
            <div className="grid grid-cols-3 gap-5 my-10">
            {
            service?.subCategories?.map((service) => (
                <ServiceCard service={service} key={service.id} />
            ))
            }
            </div>
        </div>
    );
};

export default Service;