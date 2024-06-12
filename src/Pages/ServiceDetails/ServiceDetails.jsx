import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ServiceFAQ from "./ServiceFAQ/ServiceFAQ";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import Details from "./Details/Details";
import { Link } from "react-scroll";
import { ThemeContext } from "../../App";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthProvider";
import ServiceProvider from "./ServiceProvider/ServiceProvider";
import BookingModal from "./BookingModal/BookingModal";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { serviceCategory, subCategory, serviceOverview, faq } =
    useLoaderData();
  const encodedServiceCategory = encodeURIComponent(serviceCategory);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceMan, setServiceMan] = useState({});
  const [amount, setAmount] = useState(0);

  const {
    data: userData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(),
  });

  const handleChangeModalState = async () => {
    await setModalOpen((prev) => !prev);
    document.getElementById("booking_modal")?.showModal();
  };

  const fetchUserData = async () => {
    const response = await fetch(
      `
    https://subidha-home-services-server3792.glitch.me/users/${user?.uid}`,
      {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();

    // Check if required conditions are met to load provider data
    if (userData.division && userData.district && userData.upazila) {
      // If conditions are met, fetch provider data
      const providerData = await fetchProviderData(userData);
      if (providerData.length > 0) {
        setProviders(providerData);
        setLoading(false);
      } else {
        toast.info(
          `Hi ${user?.displayName}! we're so sorry, we couldn't find any
        service providers available in your area right now.`,
          {
            hideProgressBar: true,
            // theme: "colored",
            autoClose: false,
          }
        );
        setLoading(false);
      }
      // You can do something with providerData, like updating state or rendering
      // ...
    }

    return userData;
  };

  const fetchProviderData = async (userData) => {
    setLoading(true);
    const response = await fetch(
      `https://subidha-home-services-server3792.glitch.me/providers?division=${userData.division}&district=${userData.district}&upazila=${userData.upazila}&serviceCategory=${encodedServiceCategory}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  if (error) {
    toast.error("There was an error fetching user data.", {
      hideProgressBar: true,
      autoClose: false,
      // theme: "colored",
    });
    return;
  }

  return (
    <section className="xl:max-w-screen-xl mx-auto flex flex-wrap lg:flex-nowrap my-5 md:my-10 px-4 gap-5">
      <div className="card card-compact bg-base-100 min-w-[100%] lg:min-w-0 lg:max-w-[62%]">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-8">
          <h2 className="text-2xl font-semibold text-[#FF6600]">
            {subCategory.serviceName}
          </h2>
          <ul className="menu bg-base-200 menu-horizontal rounded-box h-fit text-sm font-semibold w-fit shadow-none">
            <li>
              <Link to="service-overview" smooth={true} duration={500}>
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
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                Service Overview
              </Link>
            </li>
            <li>
              <Link to="faq" smooth={true} duration={500}>
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
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="details" smooth={true} duration={500}>
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                Details
              </Link>
            </li>
          </ul>
        </div>

        <img
          className="rounded-3xl w-full"
          src={subCategory.image}
          alt="Shoes"
        />
        <p className="mt-5 mb-4 font-semibold text-sm">
          {subCategory.description}
        </p>
        <>
          <ServiceOverview serviceOverview={serviceOverview} />
          <ServiceFAQ faq={faq} />
          <Details details={subCategory.details} />
        </>
      </div>

      <div className="lg:h-[60Fh] overflow-auto custom-provider-scrollbar lg:px-3 sticky top-10 flex flex-col gap-10 grow">
        {providers.map((provider) => (
          <ServiceProvider
            handleChangeModalState={handleChangeModalState}
            key={provider._id}
            provider={provider}
            setServiceMan={setServiceMan}
            serviceName={subCategory.serviceName}
            setAmount={setAmount}
          />
        ))}

        {(isLoading || loading) && (
          <div className="flex flex-col gap-4 px-4">
            <div className="flex gap-4">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-52"></div>
                <div className="skeleton h-4 w-52"></div>
                <div className="skeleton h-4 w-52"></div>
                <div className="skeleton h-4 w-52"></div>
              </div>
            </div>
            <div className="skeleton h-10 w-full rounded-none mt-5"></div>
          </div>
        )}
      </div>

      {modalOpen && (
        <BookingModal
          handleChangeModalState={handleChangeModalState}
          userData={userData}
          subCategory={subCategory}
          serviceMan={serviceMan}
          amount={amount}
        />
      )}
    </section>
  );
};

export default ServiceDetails;
