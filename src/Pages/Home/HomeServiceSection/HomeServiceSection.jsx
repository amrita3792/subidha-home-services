import React from "react";

const HomeServiceSection = () => {
  return (
    <>
      <div className="bg-[#345DA7] lg:-mt-20 py-40 px-4">
        <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto text-center text-white">
          <p className="font-semibold">Subidha Home Service</p>
          <h1 className="text-5xl font-semibold mt-4 mb-8">
            Trusted Service Provider For Repair, Cleaning, And Health In Your
            Home
          </h1>
          <p>
            Subidha Home Service is your premier, trusted partner dedicated to
            providing comprehensive solutions for all your home care needs. From
            essential repairs to meticulous cleaning and personalized health
            services, we pride ourselves on delivering excellence at every step.
            With a commitment to quality and a team of skilled professionals, we
            ensure your home remains a sanctuary of comfort and well-being.
          </p>
        </div>
      </div>
      <div className="bg-[#1F1F1F]">
        <div className="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto text-white flex flex-col md:flex-row justify-between py-8">
            <div className="py-10 px-4 grow"> 
                <p>Customer</p>
                <h2 className="text-5xl font-semibold mt-2">1500+</h2>
            </div>
            <div className="py-10 px-5 grow md:border-l md:border-r">
                <p>Employee</p>
                <h2 className="text-5xl font-semibold mt-2">500+</h2>
            </div>
            <div className="py-10 px-5 grow">
                <p>Review</p>
                <h2 className="text-5xl font-semibold mt-2">1200+</h2>
            </div>
        </div>
      </div>
    </>
  );
};

export default HomeServiceSection;
