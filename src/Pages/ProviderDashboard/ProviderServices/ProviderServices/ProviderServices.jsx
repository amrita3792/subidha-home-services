import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Link } from "react-router-dom";
import Loading from "../../../../Components/Loading/Loading";

const ProviderServices = () => {
  const { user } = useContext(AuthContext);
  const [serviceCategory, setServiceCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://subidha-home-services-server3792.glitch.me/providers/${user.uid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setServiceCategory(data.serviceCategory);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (serviceCategory) {
      fetch(
        `https://subidha-home-services-server3792.glitch.me/service-categories?serviceName=${serviceCategory}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setSubCategories(data.subCategories);
        });
    }
  }, [serviceCategory, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center h-full mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-10 rounded-xl">
      <h3 className="font-semibold text-2xl mb-8">Provider Services</h3>
      <div className="flex justify-end"></div>
      <div className="flex items-center gap-5">
        <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95 border-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
          Active Services
        </button>
        <button className="btn btn-neutral hover:bg-slate-300 border-none hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          Inactive Services
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8 my-8">
        {subCategories.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            serviceCategory={serviceCategory}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default ProviderServices;
