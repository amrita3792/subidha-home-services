import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import UserReview from "./UserReview/UserReview";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../App";
import noDataFound from '../../../assets/images/no-data-found.png';

const UserReviews = () => {
    const {user} = useContext(AuthContext);
    const {theme} = useContext(ThemeContext);

    const { data: reviews = [], isLoading, isError, error } = useQuery ({
        queryKey: ["user-reviews"],
        queryFn: () =>
          fetch(
            `https://subidha-home-services-server3792.glitch.me/user-reviews/${user.uid}`
          ).then((res) => res.json()),
      });

      if(isError) {
        toast.error(error.message, {
          hideProgressBar: true,
          // theme: "colored",
        });
      }

      if (isLoading) {
        return (
          <div className="absolute w-full top-0 left-0 h-full flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
          </div>
        );
      }

      if (!isLoading && !reviews.length) {
        return (
          <div className="flex flex-col justify-center items-center relative">
            <img src={noDataFound} alt="Girl in a jacket" />
          </div>
        );
      }
    return (
        <div>
            <h3 className="font-semibold text-2xl text-center">My Reviews</h3>
            <div className={`my-12 border ${theme === "dark" && "border-slate-600"} p-7 rounded-xl`}>
            {
                reviews.map(review => <UserReview key={review._id} review={review} />)
            }
            </div>
        </div>
    );
};

export default UserReviews;