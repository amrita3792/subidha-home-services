import React from "react";
import serviceMan from "../../../assets/images/service-man.png";
import { Link } from "react-router-dom";
import ProviderRegistrationModal from "../ProviderRegistrationModal/ProviderRegistrationModal";

const GetJobs = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-10 px-5">
     <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Apply Now</button>
     <ProviderRegistrationModal />
    </div>
  );
};

export default GetJobs;
