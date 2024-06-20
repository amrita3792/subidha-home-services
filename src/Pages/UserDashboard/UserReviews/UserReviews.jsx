import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import UserReview from "./UserReview/UserReview";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../App";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

const UserReviews = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/user-reviews/${user.uid}`
      ).then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message, {
      theme: "colored",
    });
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/user-dashboard/dashboard">User Dashboard</Link>
            </li>
            <li>
              My Reviews
            </li>
          </ul>
        </div>
      </div>
      <h3 className="font-semibold text-3xl text-center mb-8">My Reviews</h3>
      {!isLoading && reviews.length > 0 ? (
        <div
          className={`border ${
            theme === "dark" ? "border-slate-600" : "border-gray-300"
          } shadow-lg rounded-xl p-6`}
        >
          {reviews.map((review) => (
            <UserReview key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-12">
          <img src={noDataFound} alt="No Data Found" />
        </div>
      )}
    </div>
  );
};

export default UserReviews;
