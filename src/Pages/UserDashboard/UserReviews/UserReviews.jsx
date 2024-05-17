import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import UserReview from "./UserReview/UserReview";
import { toast } from "react-toastify";

const UserReviews = () => {
    const {user} = useContext(AuthContext);

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
          theme: "colored",
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
            <img src="https://i.ibb.co/gMRWPqK/Ufo-3.gif" alt="Girl in a jacket" />
            <h2 className="absolute bottom-24 text-xl font-semibold">NO REVIEWS FOUND !</h2>
          </div>
        );
      }
    return (
        <div>
            <h3 className="font-semibold text-xl text-center">MY REVIEWS</h3>
            <div className="my-12 border p-7 rounded-xl">
            {
                reviews.map(review => <UserReview key={review._id} review={review} />)
            }
            </div>
        </div>
    );
};

export default UserReviews;