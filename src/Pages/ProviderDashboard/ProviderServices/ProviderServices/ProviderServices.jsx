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
      }).catch(error => {
        
      })
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
          Active Services
        </button>
        <button className="btn btn-neutral hover:bg-slate-300 border-none hover:text-black">
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
