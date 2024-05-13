import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext } from "../../../App";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ProviderBookings = () => {
  const { user } = useContext(AuthContext);
  const { receiver, setReceiver } = useContext(ChatContext);
  //   console.log(receiver);
  //   const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    data: bookings = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchBookingData(),
  });

  const fetchBookingData = async () => {
    const response = await fetch(
      `http://localhost:5000/provider-bookings/${user.uid}`,
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

  const [status, setStatus] = useState("Order Placed");

  const handleStatusChange = (event, bookingId) => {
    setStatus(event.target.value);
    console.log(event.target.value);

    fetch(`http://localhost:5000/booking-status/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: event.target.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      })
      .catch((error) => {
        console.error(error);
        //   setLoading(false);
      });
  };

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-8 text-cente ">MY BOOKINS</h2>
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
                            booking.bookingStatus === "Order Completed" ||
                            booking.bookingStatus === "Order Processing"
                          }
                          value="Order Processing"
                        >
                          Order Processing
                        </option>
                        <option
                          disabled={booking.bookingStatus === "Order Completed"}
                          value="Order Completed"
                        >
                          Order Completed
                        </option>
                      </select>
                    </td>
                    <th>
                      <button
                        onClick={() =>
                          setReceiver({
                            uid: booking.userUID,
                            photoURL: booking.userPhotoURL,
                            userName: booking.userName,
                          })
                        }
                        className="btn btn-ghost btn-xs bg-secondary text-white hover:text-black"
                      >
                        Chat
                      </button>
                    </th>
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
    </div>
  );
};

export default ProviderBookings;
