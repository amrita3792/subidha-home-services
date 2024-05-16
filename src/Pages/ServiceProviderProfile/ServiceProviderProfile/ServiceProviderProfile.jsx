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
    const response = await fetch(`
https://subidha-home-services-server3792.glitch.me/reviews/${uid}`, {
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  // console.log(reviews);

  return (
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto">
      <div className="relative">
        <img className="w-full mt-7 rounded-3xl" src={photoURL} alt="" />
        <div className="absolute left-0 top-0 bg-black opacity-30 h-full w-full rounded-3xl"></div>
      </div>
      <h2 className="text-3xl font-semibold mt-5">
        BusinessName: {businessName}
      </h2>
      <p className="mt-5 font-semibold ">
        Provider Name: <span className="font-normal">{name}</span>
      </p>
      <p className="font-semibold">
        Phone: <span className="font-normal">{phone}</span>
      </p>
      <p className="font-semibold">
        Years of Experience:{" "}
        <span className="font-normal">{yearsOfExperience}</span>
      </p>
      <hr className="mt-8" />
      <div className="mt-6">
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
