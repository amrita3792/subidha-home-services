// import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const BookingDetails = () => {
  // const navigate = useNavigate();
  const booking = useLoaderData();
  const [loading, setLoading] = useState(false);

  console.log(booking);

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
    invoiceNumber,
    serviceQuantity,
    unitCost,
    invoiceDate,
    selectedSlot,
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

  const handleDownloadInvoice = () => {
    window.location.replace(
      `https://anyapi.io/api/v1/invoice/generate?apiKey=9cmbqv1tfaou1l8c2eepi8fi39f3s1sbfja2jo3gvg86j424q9l71g&number=${invoiceNumber}&logo=https://i.postimg.cc/CKDMny4Y/subidha-logo.png&amount_paid=${totalAmount}&items[0][quantity]=${serviceQuantity}&items[0][unit_cost]=${unitCost}&currency=BDT&items[0][name]=${service}&date=${invoiceDate}`
    );
  };

  const handleCancelBooking = (bookingId) => {
    if (confirm("Are you sure want to Cancel booking?") == true) {
      setLoading(true);
      fetch(
        `https://subidha-home-services-server3792.glitch.me/booking-status/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Cancelled by User" }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Your booking has been canceled.", {
              theme: "colored",
            });
            setLoading(false);
            location.reload();
          }
        });
    }
  };

  return (
    <div className="my-12 xl:max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Booking Details
      </h2>
      <div className="shadow-lg border p-10 rounded-2xl">
        <p className="font-semibold text-lg">TimeLine</p>
        {!(
          bookingStatus === "Cancelled by User" ||
          bookingStatus === "Cancelled by Admin"
        ) && (
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
        )}
        {(bookingStatus === "Cancelled by User" ||
          bookingStatus === "Cancelled by Admin") && (
          <ul className="steps w-full">
            <li className="step step-primary font-semibold">Order Placed</li>
            <li className="step step-primary font-semibold">Order Cancelled</li>
          </ul>
        )}
      </div>
      <div className="mt-5 grid grid-cols-4 gap-8">
        <div className="border p-4 shadow-lg rounded-2xl">
          <img className="w-full rounded-md" src={servicePhotoURL} alt="" />
          <div className="flex flex-col gap-2">
            <p className="mt-4 text-xs">B-{_id}</p>
            <p className="font-bold text-xl">
              {booking.service} <br />
              <span>{booking.totalAmount}</span>
            </p>
            <p className="font-bold text-xl text-pink-700">৳{totalAmount}</p>
          </div>
        </div>
        <div className="col-span-2 flex gap-8 flex-col grow">
          <div className="shadow-lg rounded-2xl border p-4 basis-1/2">
            <h3 className="font-semibold text-xl mb-3">Schedule:</h3>
            <p className="text-lg">
              <span className="font-semibold">Date:</span> {selectedDate} <br />
              <span className="font-semibold">Slot:</span> {selectedSlot}
            </p>
          </div>

          <div className="basis-1/2 shadow-lg rounded-2xl border p-4">
            <h3 className="font-semibold text-xl mb-3">Ordered for:</h3>
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {userName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span> {userPhone}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Location:</span> {fullAddress}
              {upazila}, {district}, {division}
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl border p-4">
          <div className="flex gap-3">
            <div className="avatar">
              <div className="w-20 h-20 rounded-md">
                <img
                  src={booking.providerPhotoURL}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="whitespace-nowrap text-sm">
                <span className="font-bold">Provider Name:</span>{" "}
                {booking.providerName}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-5">
        {bookingStatus === "Order Completed" && (
          <button
            disabled={paidStatus}
            onClick={handleMakePayment}
            className="btn btn-active btn-accent text-white bg-[#FF6600] hover:bg-orange-600 border-none  hover:btn-"
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}{" "}
            {paidStatus ? "Payment Successfull" : "Make Payment"}
          </button>
        )}
        {paidStatus && (
          <button
            onClick={handleDownloadInvoice}
            className="btn btn-active btn-accent text-white bg-[#345DA7] hover:bg-stone-400 border-none  hover:btn-"
          >
            Download Invoice
          </button>
        )}
        {(bookingStatus === "Order Placed" ||
          bookingStatus === "Order Confirmed") && (
          <button
            onClick={() => handleCancelBooking(_id)}
            className="btn bg-red-500 text-white"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Cancel"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
// github.com/srtipu5/bkash-Payment-Gateway
