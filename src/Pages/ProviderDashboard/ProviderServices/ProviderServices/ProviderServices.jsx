import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import ServiceCard from "../ServiceCard/ServiceCard";

const ProviderServices = () => {
  const { user } = useContext(AuthContext);
  const [serviceCategory, setServiceCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/providers/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServiceCategory(data.serviceCategory);
      });
  }, []);
  

  useEffect(() => {
    if (serviceCategory) {
      fetch(
        `http://localhost:5000/service-categories?serviceName=${serviceCategory}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSubCategories(data.subCategories);
        });
    }
  }, [serviceCategory, refetch]);

  // console.log(refetch);

  return (
    <div>
      <div className="flex items-center gap-5">
        <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95 border-none">
          Active Services
        </button>
        <button className="btn btn-neutral hover:bg-slate-300 border-none hover:text-black">
          Inactive Services
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8 my-8">
        {subCategories.map((service) => (
          <ServiceCard key={service.id} service={service} serviceCategory={serviceCategory} setRefetch={setRefetch} refetch={refetch}/>
        ))}
      </div>
    </div>
  );
};

export default ProviderServices;
