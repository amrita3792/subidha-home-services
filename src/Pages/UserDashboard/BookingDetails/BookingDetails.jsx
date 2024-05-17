import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const navigate = useNavigate();
  const booking = useLoaderData();
  const [loading, setLoading] = useState(false);
  const {
    servicePhotoURL,
    _id,
    totalAmount,
    service,
    selectedDate,
    userName,
    userPhone,
    upazila,
    district,
    division,
    fullAddress,
    bookingStatus,
    paidStatus,
  } = booking;

  const handleMakePayment = () => {
    setLoading(true);
    fetch("https://subidha-home-services-server3792.glitch.me/make-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.url) {
          setLoading(false);
          window.location.replace(data.url);
        }
      });
  };

  return (
    <div className="mb-28">
      <h2 className="text-xl font-semibold mb-8 text-center">BOOKING DETAILS</h2>
      <ul className="steps steps-vertical lg:steps-horizontal w-full">
        <li className="step step-primary font-semibold">Order Placed</li>
        <li
          className={`${
            (bookingStatus === "Order Confirmed" ||
              bookingStatus === "Order Processing" ||
              bookingStatus === "Order Processing" ||
              bookingStatus === "Order Completed") &&
            "step-primary"
          } step font-semibold`}
        >
          Order Confirmed
        </li>
        <li
          className={`${
            (bookingStatus === "Order Processing" ||
              bookingStatus === "Order Completed") &&
            "step-primary"
          } step font-semibold`}
        >
          Order Processing
        </li>
        <li
          className={`${
            bookingStatus === "Order Completed" && "step-primary"
          } step font-semibold`}
        >
          Order Completed
        </li>
      </ul>
      <div className="mt-16 flex gap-8">
        <div>
          <img className="w-52 rounded-md" src={servicePhotoURL} alt="" />
          <p className="mt-4 text-xs">{_id}</p>
          <p className="font-bold text-nowrap my-1">{service}</p>
          <p className="font-bold text-lg">৳{totalAmount}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">Schedule</h3>
          <p className="text-lg">
            <span className="font-semibold">Date:</span> {selectedDate}
          </p>
          <h3 className="font-semibold text-lg mt-5 mb-1">Ordered for</h3>
          <p>
            <span className="font-semibold">Name:</span> {userName}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {userPhone}
          </p>
          <p className="white">
            <span className="font-semibold">Location:</span> {fullAddress}
            {upazila}, {district}, {division}
          </p>
        </div>
        <div>
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
              <div className="whitespace-nowrap">
                <span className="font-bold">Provider Name:</span>{" "}
                {booking.providerName}
              </div>

              <div>
                <span className="font-bold">Phone:</span>{" "}
                {booking.providerPhone}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-5">
        {bookingStatus === "Order Completed" && (
          <button disabled={paidStatus}
            onClick={handleMakePayment}
            className="btn btn-active btn-accent text-white bg-[#FF6600] hover:bg-orange-600 border-none  hover:btn-"
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}{" "}
            {paidStatus ? "Payment Successfull" : "Make Payment"}
          </button>
        )}
        <button className="btn btn-active btn-accent text-white bg-[#345DA7] hover:bg-stone-400 border-none  hover:btn-">
          Download Invoice
        </button>
        {(bookingStatus === "Order Placed" ||
          bookingStatus === "Order Confirmed") && (
          <button className="btn bg-red-500 text-white">Cancel</button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
// github.com/srtipu5/bkash-Payment-Gateway
