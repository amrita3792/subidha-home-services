import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext, ThemeContext } from "../../../App";
import { Link } from "react-router-dom";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const { receiver, setReceiver } = useContext(ChatContext);
  // const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewService, setReviewService] = useState("");
  const { theme } = useContext(ThemeContext);

  const {
    data: bookings = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/booking/${user.uid}`
      ).then((res) => res.json()),
  });

  const handleChangeModalState = async () => {
    await setIsModalOpen((prev) => !prev);
    document.getElementById("review-modal").showModal();
  };

  if (isError) {
    toast.error(error.message, {
      hideProgressBar: true,
      // theme: "colored",
    });
  }

  if (!isLoading && !bookings.length) {
    return (
      <div className="flex flex-col justify-center items-center relative">
        <img src={noDataFound} alt="Girl in a jacket" />
      </div>
    );
  }

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            My Bookings
          </h2>
          <div className="overflow-x-auto">
            <table
              className={`table ${
                theme === "light" ? "border" : "border-slate-600"
              }`}
            >
              {/* head */}
              <thead
                className={`border ${
                  theme === "light" ? "border" : "border-slate-600"
                }`}
              >
                <tr className="text-sm">
                  <th>Booking Details</th>
                  <th>Service Provider</th>
                  <th>Message</th>
                  <th>Details</th>
                  <th>Review</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    className={`border shadow-xl ${
                      theme === "light" ? "border" : "border-slate-600"
                    }`}
                    key={booking._id}
                  >
                    <td>
                      <div className="flex flex-col gap-3">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-md">
                            <img
                              src={booking.servicePhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">
                            {booking.service} <br />
                            <span
                              className={`text-sm ${
                                booking.bookingStatus === "Cancelled by User"
                                  ? "bg-red-500"
                                  : "bg-green-700"
                              } text-white`}
                            >
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Booking Date:</span>{" "}
                            {booking.selectedDate}
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Total Amount:</span>{" "}
                            {booking.totalAmount} Taka
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
                      <div className="flex flex-col gap-3">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-md">
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
                        </div>
                      </div>
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          if (receiver?.uid === booking?.serviceManUID) {
                            return;
                          } else {
                            setReceiver({
                              uid: booking.serviceManUID,
                              photoURL: booking.providerPhotoURL,
                              userName: booking.providerName,
                            });
                          }
                        }}
                        className="btn btn-ghost btn-xs bg-[#345DA7] text-white hover:text-black"
                      >
                        Chat
                      </button>
                    </th>
                    <th>
                      <Link
                        to={`/user-dashboard/booking-list/${booking._id}`}
                        className="btn btn-ghost btn-xs bg-[#FF6600] text-white hover:text-black"
                      >
                        details
                      </Link>
                    </th>
                    {booking?.paidStatus && (
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

{
  /* <div className="h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-8 text-center">MY BOOKINS</h2>
          <div className="overflow-x-auto">
            <table className="table">

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
                      <div className="flex flex-col gap-3">
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
                            <span className="font-bold">Total Amount:</span>{" "}
                            {booking.totalAmount} Taka
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
                      <div className="flex flex-col gap-3">
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
                          <div className="text-sm">
                            <span className="font-bold">Phone:</span>{" "}
                            {booking.providerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button
                        onClick={() =>
                          {
                            if(receiver?.uid === booking?.serviceManUID) {
                              return;
                            } else {
                              setReceiver({
                                uid: booking.serviceManUID,
                                photoURL: booking.providerPhotoURL,
                                userName: booking.providerName,
                              })
                            }
                          }
                        }
                        className="btn btn-ghost btn-xs bg-[#345DA7] text-white hover:text-black"
                      >
                        Chat
                      </button>
                    </th>
                    <th>
                      <Link
                        to={`/user-dashboard/booking-list/${booking._id}`}
                        className="btn btn-ghost btn-xs bg-[#FF6600] text-white hover:text-black"
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
    </div> */
}
