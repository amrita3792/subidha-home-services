import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../App";
import noDataFound from "../../../assets/images/no-data-found.png";
import ProviderReview from "./ProviderReview/ProviderReview";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

const ProviderReviews = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      // Scroll to top smoothly when the component unmounts
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []); // Empty dependency array ensures this effect runs only on unmount

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["provider-reviews"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/reviews/${user.uid}`
      ).then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message, {
      
      theme: "colored",
    });
  }

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-xl shadow-md">
      <h3 className="font-semibold text-2xl mb-10">Reviews</h3>
      {!isLoading && reviews.length > 0 ? (
        <div
          className={` ${
            theme === "dark" && "border-slate-600"
          } rounded-xl`}
        >
          {reviews.map((review) => (
            <ProviderReview key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src={noDataFound} alt="" />
        </div>
      )}
    </div>
  );
};

export default ProviderReviews;
