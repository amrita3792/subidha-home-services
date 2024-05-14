import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext } from "../../../App";
import { Link } from "react-router-dom";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const { receiver, setReceiver } = useContext(ChatContext);
  // console.log(receiver);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewService, setReviewService] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://subidha-home-services-server3792.glitch.me/booking/${user.uid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  const handleChangeModalState = async () => {
    await setIsModalOpen((prev) => !prev);
    document.getElementById("review-modal").showModal();
  };

  // console.log(loading);

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-8 text-center">MY BOOKINS</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-base">
                  <th>Booking Details</th>
                  <th>Service Provider</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <div className="flex gap-3">
                        <div className="avatar">
                          <div className="w-28 h-28 rounded-md">
                            <img
                              src={booking.servicePhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">
                            {booking.service} <br />
                            <span className="text-sm bg-green-700 text-white">
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Booking Date:</span>{" "}
                            {booking.selectedDate}
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Amount:</span>{" "}
                            {booking.amount} Taka
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Quantity:</span>{" "}
                            {booking.serviceQuantity}
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Location:</span>{" "}
                            {booking.fullAddress}, {booking.upazila},{" "}
                            {booking.district}, {booking.division}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <div className="avatar">
                          <div className="w-28 h-28 rounded-md">
                            <img
                              src={booking.providerPhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-bold">Provider Name:</span>{" "}
                            {booking.providerName}
                          </div>

                          <div className="text-sm">
                            <span className="font-bold">Phone:</span>{" "}
                            {booking.providerPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button
                        onClick={() =>
                          setReceiver({
                            uid: booking.serviceManUID,
                            photoURL: booking.providerPhotoURL,
                            userName: booking.providerName,
                          })
                        }
                        className="btn btn-ghost btn-xs bg-secondary text-white hover:text-black"
                      >
                        Chat
                      </button>
                    </th>
                    <th>
                      <Link
                        to={`/user-dashboard/booking-list/${booking._id}`}
                        className="btn btn-ghost btn-xs bg-primary text-white hover:text-black"
                      >
                        details
                      </Link>
                    </th>
                    {booking.bookingStatus === "Order Completed" && (
                      <th>
                        <button
                          onClick={() => {
                            setReviewService(booking);
                            handleChangeModalState();
                          }}
                          className="btn btn-ghost btn-xs bg-neutral text-white hover:text-black"
                        >
                          Review
                        </button>
                      </th>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ReviewModal
          reviewService={reviewService}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default UserBookings;
