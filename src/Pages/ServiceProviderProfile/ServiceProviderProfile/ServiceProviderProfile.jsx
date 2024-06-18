import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import Review from "../Review/Review";

const ServiceProviderProfile = () => {
  const provider = useLoaderData();
  const { businessName, photoURL, name, yearsOfExperience, phone, uid } =
    provider;

  const {
    data: reviews = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviewsData(),
  });

  const fetchReviewsData = async () => {
    const response = await fetch(
      `https://subidha-home-services-server3792.glitch.me/reviews/${uid}`,
      {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  const { data: providerDetails = {} } = useQuery({
    queryKey: ["provider-details"],
    queryFn: () => fetchProviderData(),
  });

  const fetchProviderData = async () => {
    const response = await fetch(
      `https://subidha-home-services-server3792.glitch.me/providers/${uid}`,
      {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  // console.log(providerDetails);

  return (
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto">
      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-5">My Services</h2>
        {providerDetails?.myServices?.map((service, idx) => (
          <div key={service.serviceName}>
            <div className="collapse collapse-arrow bg-base-200">
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked={idx === 0}
              />
              <div className="collapse-title text-xl font-medium">
                {service.title}
              </div>
              <div className="collapse-content">
                <p>{service.details}</p>
                <img
                  className="w-[300px] mt-8"
                  src={service.selectedFileURL}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <img className="w-full mt-7 rounded-3xl" src={photoURL} alt="" />
      </div>
      <p className="mt-5 font-semibold text-center">
        Provider Name: <span className="font-normal">{name}</span>
      </p>
      <p className="font-semibold text-center">
        Email: <span className="font-normal">{provider.email}</span>
      </p>
      <p className="font-semibold text-center mb-2">
        Years of Experience:{" "}
        <span className="font-normal">{yearsOfExperience}</span>
      </p>
      <hr />
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-10">Customer Reviews</h2>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
