import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProviderBookings = () => {
  const { user } = useContext(AuthContext);
  const { receiver, setReceiver } = useContext(ChatContext);

  //   const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Order Placed");

  const {
    data: bookings = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["provider-bookings"],
    queryFn: () => fetchBookingData(),
  });

  const fetchBookingData = async () => {
    const response = await fetch(
      `https://subidha-home-services-server3792.glitch.me/provider-bookings/${user.uid}`,
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

  if (isLoading) {
    return (
      <div className="absolute w-full top-0 left-0 h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  const handleStatusChange = (event, bookingId) => {
    setStatus(event.target.value);
    if (confirm("Are you sure want to update status?") == true) {
      fetch(
        `https://subidha-home-services-server3792.glitch.me/booking-status/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: event.target.value }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            toast.success(
              `The booking has been ${event.target.value.split(" ")[1]}.`,
              {
                hideProgressBar: true,
                // theme: "colored",
              }
            );
            refetch();
          }
        })
        .catch((error) => {
          console.error(error);
          //   setLoading(false);
        });
    }
  };

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="flex justify-end">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/provider-dashboard/dashboard">
                    Provider Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/provider-dashboard/booking-list">Booking List</Link>
                </li>
              </ul>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Booking List
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-base">
                  <th>Booking Details</th>
                  <th>User Details</th>
                  <th>Booking Status</th>
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
                            {booking.service}
                            <br />
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
                              src={booking.userPhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-bold">User Name:</span>{" "}
                            {booking.userName}
                          </div>

                          <div className="text-sm">
                            <span className="font-bold">Phone:</span>{" "}
                            {booking.userPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {!(
                        booking.bookingStatus === "Cancelled by User" ||
                        booking.bookingStatus === "Order Completed"
                      ) && (
                        <select
                          defaultValue={booking.bookingStatus}
                          onChange={(e) => handleStatusChange(e, booking._id)}
                          className="select select-bordered w-full max-w-xs"
                        >
                          <option disabled value="">
                            ---Booking Status---
                          </option>
                          <option disabled value="Order Placed">
                            Order Placed
                          </option>
                          <option
                            disabled={
                              booking.bookingStatus === "Order Completed" ||
                              booking.bookingStatus === "Order Confirmed" ||
                              booking.bookingStatus === "Order Processing"
                            }
                            value="Order Confirmed"
                          >
                            Order Confirmed
                          </option>
                          <option
                            disabled={
                              booking.bookingStatus === "Order Placed" ||
                              booking.bookingStatus === "Order Completed" ||
                              booking.bookingStatus === "Order Processing"
                            }
                            value="Order Processing"
                          >
                            Order Processing
                          </option>
                          <option
                            disabled={
                              booking.bookingStatus === "Order Completed" ||
                              booking.bookingStatus === "Order Placed" ||
                              booking.bookingStatus === "Order Confirmed"
                            }
                            value="Order Completed"
                          >
                            Order Completed
                          </option>
                        </select>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          if (receiver?.uid === booking?.userUID) {
                            return;
                          } else {
                            setReceiver({
                              uid: booking.userUID,
                              photoURL: booking.userPhotoURL,
                              userName: booking.userName,
                            });
                          }
                        }}
                        className="btn btn-ghost btn-xs bg-[#345DA7] text-white hover:text-black"
                      >
                        Chat
                      </button>
                    </th>
                    {!(
                      booking.bookingStatus === "Cancelled by User" ||
                      booking.bookingStatus === "Order Confirmed" ||
                      booking.bookingStatus === "Order Processing" ||
                      booking.bookingStatus === "Order Completed"
                    ) && (
                      <th>
                        <button className="btn bg-red-500 py-3 text-white hover:text-black">
                          Cancel Order
                        </button>
                      </th>
                    )}
                    {/* <th>
                      <Link
                        to={`/user-dashboard/booking-list/${booking._id}`}
                        className="btn btn-ghost btn-xs bg-primary text-white hover:text-black"
                      >
                        details
                      </Link>
                    </th> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ConfirmationModal />
    </div>
  );
};

export default ProviderBookings;
