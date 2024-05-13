import { useLoaderData } from "react-router-dom";

const ServiceProviderProfile = () => {
  const provider = useLoaderData();
  const { businessName, photoURL, name, yearsOfExperience, phone } = provider;
  console.log(provider);
  return (
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto">
      <h2 className="text-3xl font-semibold mt-14">
        BusinessName: {businessName}
      </h2>
      <div className="relative">
        <img className="w-full mt-7 rounded-3xl" src={photoURL} alt="" />
        <div className="absolute left-0 top-0 bg-black opacity-30 h-full w-full rounded-3xl"></div>
      </div>
      <p className="font-semibold mt-5">Provider Name: {name}</p>
      <p className="font-semibold">Phone: {phone}</p>
      <p className="font-semibold">Years of Experience: {yearsOfExperience}</p>
      <hr />
    </div>
  );
};

export default ServiceProviderProfile;
