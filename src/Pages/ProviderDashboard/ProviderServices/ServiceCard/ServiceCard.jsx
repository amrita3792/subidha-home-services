import { useContext, useEffect, useState } from "react";
import EditService from "../EditService/EditService";
import { AuthContext } from "../../../../contexts/AuthProvider";

const CategoryCard = ({ service, serviceCategory, setRefetch, refetch}) => {
  const { user } = useContext(AuthContext);
  const { serviceName, image } = service;
  const [editService, setEditService] = useState(false);
  const [myService, setMyService] = useState("");
  const [updateService, setUpdateService] = useState({});

  const handleChangeModalState = async () => {
    await setEditService((prev) => !prev);
    document.getElementById("edit_service")?.showModal();
  };

  useEffect(() => {
    
    fetch(`https://subidha-home-services-server3792.glitch.me/provider-service/${user.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceName: service.serviceName }),
    })
      .then(res => res.json())
      .then(data => {

        if(data) {
        
          setMyService(data)
        }
      }) .catch(error => {
        
      })
  }, [refetch]);



  return (
    <div className="card card-compact  bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{serviceName}</h2>
        <h2 className="text-xl font-semibold">{myService?.amount ? `${myService.amount} TK` : "0 TK"}</h2>
        <div className="flex items-center justify-between text-green-600">
          <div
            onClick={async () => {
              setUpdateService(myService);
              await setEditService((prev) => !prev);
              document.getElementById("edit_service").showModal();
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="font-semibold">Edit</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-red-500 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            Inactive
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleChangeModalState}
            className="btn btn-info text-white"
          >
            Apply Offer
          </button>
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <input type="checkbox" className="checkbox" />
              <span className="label-text font-semibold">Select</span>
            </label>
          </div>
        </div>
      </div>
      {editService && (
        <EditService
          service={service}
          editService={editService}
          setEditService={setEditService}
          serviceCategory={serviceCategory}
          handleChangeModalState={handleChangeModalState}
          setRefetch={setRefetch}
          updateService={updateService}
          
        />
      )}
    </div>
  );
};

export default CategoryCard;
