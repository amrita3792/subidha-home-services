import React, { useContext } from "react";
import { ChatContext, ThemeContext } from "../../../App";
import { Link } from "react-router-dom";

const ServiceProvider = ({
  provider,
  handleChangeModalState,
  setServiceMan,
  serviceName,
  setAmount,
}) => {
  const { theme } = useContext(ThemeContext);
  const { receiver, setReceiver } = useContext(ChatContext);

  const { name, phone, email, photoURL, yearsOfExperience, uid, myServices } =
    provider;

  const matchedService = myServices.find(
    (service) => service.serviceName === serviceName
  );
  return (
    <div
      className={`border ${
        theme === "dark" && "border-slate-600"
      } p-4 rounded-xl`}
    >
      <div className="flex gap-5">
        <img className="w-16 h-16 rounded-full" src={photoURL} alt="Shoes" />

        <div>
          <h2 className="card-title text-base">{name} (provider)</h2>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {phone}
          </p>
          <p>
            <span className="font-semibold">Years Of Experience:</span>{" "}
            {yearsOfExperience}
          </p>
          {matchedService?.amount && (
            <p className="text-xl font-semibold mt-3">
              Amount: {matchedService?.amount}TK
            </p>
          )}
          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card-actions gap-3 justify-end font-semibold mt-3">
        <Link to={`/provider-profile/${uid}`}>
          <button className="flex gap-1 rounded-3xl text-sm items-center underline hover:no-underline text-[#FF6600]">
            Profile
          </button>
        </Link>
        <button
          onClick={() => {
            setReceiver(provider);
          }}
          className="flex gap-1 rounded-3xl text-sm items-center underline hover:no-underline"
        >
          Chat
        </button>
      </div>
      <button
        disabled={!matchedService}
        onClick={() => {
          handleChangeModalState();
          setAmount(matchedService.amount);
          setServiceMan(provider);
        }}
        className={`w-full mt-3 bg-[#FF6600] hover:bg-[#1D2736] ${
          !matchedService && "bg-slate-300"
        } text-white py-3 rounded-none h-fit text-sm font-semibold`}
      >
        {matchedService ? "Book Appointment" : "NOT AVAILABLE"}
      </button>
    </div>
  );
};

export default ServiceProvider;
