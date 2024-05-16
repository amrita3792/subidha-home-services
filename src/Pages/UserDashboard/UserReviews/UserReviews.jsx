import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import UserReview from "./UserReview/UserReview";

const UserReviews = () => {
    const {user} = useContext(AuthContext);

    const { data: reviews = [] } = useQuery ({
        queryKey: ["user-reviews"],
        queryFn: () =>
          fetch(
            `https://subidha-home-services-server3792.glitch.me/user-reviews/${user.uid}`
          ).then((res) => res.json()),
      });

      console.log(reviews);
    return (
        <div>
            <h3 className="font-semibold text-xl text-center">My REVIEWS</h3>
            <div className="my-12 border p-7 rounded-xl">
            {
                reviews.map(review => <UserReview key={review._id} review={review} />)
            }
            </div>
        </div>
    );
};

export default UserReviews;