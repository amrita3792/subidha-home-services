import React, { useContext } from 'react';
import { ChatContext, ThemeContext } from '../../../App';
import { Link } from 'react-router-dom';

const ServiceProvider = ({provider, handleChangeModalState, setServiceMan}) => {
    const {theme} = useContext(ThemeContext);
    const {receiver, setReceiver} = useContext(ChatContext);

    const {name, phone, email, photoURL, yearsOfExperience, uid} = provider;

    return (
        <div
          className={`border ${
            theme === "dark" && "border-slate-600"
          } p-4 rounded-xl`}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">
            Service Provider
          </h3>
          <div className="flex items-center gap-5">
            <img
              className="w-16 h-16 rounded-full"
              src={photoURL}
              alt="Shoes"
            />

            <div>
              <h2 className="card-title text-base">{name} (provider)</h2>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {phone}
              </p>
              <p>
                <span className="font-semibold">Years Of Experience:</span> {yearsOfExperience}
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card-actions gap-3 justify-end font-semibold mt-3">
            <Link to={`/provider-profile/${uid}`}><button className="flex gap-1 rounded-3xl text-sm items-center underline hover:no-underline text-[#FF6600]">
              Profile
            </button></Link>
            <button onClick={() => {
              setReceiver(provider);
            }} className="flex gap-1 rounded-3xl text-sm items-center underline hover:no-underline">
              Chat
            </button>
          </div>
          <button onClick={() => {
            handleChangeModalState();
            setServiceMan(provider);

          }} className="w-full mt-3 bg-[#FF6600] hover:bg-[#1D2736] text-white py-3 rounded-none h-fit text-sm font-semibold">
            Book Appointment
          </button>
        </div>
    );
};

export default ServiceProvider;