import React from 'react';

const ServiceOverview = ({serviceOverview}) => {
    console.log(serviceOverview);
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Service Overview</h2>
            {
                serviceOverview.map((item, idx) => (
                    <div className="mt-7" key={idx}>
                        <h2 className="text-xl font-bold">{item.title}</h2>
                        <ul className="ps-10" style={{ listStyleType: 'disc' }}>
                            {
                                item.details.map((item, idx )=> <li key={idx}>{item}</li>)
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};

export default ServiceOverview;