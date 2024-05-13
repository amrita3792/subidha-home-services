import { useLoaderData } from "react-router-dom";

const BookingDetails = () => {
  const booking = useLoaderData();
  const {
    servicePhotoURL,
    _id,
    amount,
    service,
    selectedDate,
    userName,
    userPhone,
    upazila,
    district,
    division,
    fullAddress,
    bookingStatus,
  } = booking;
  return (
    <div className="mb-28">
      <h2 className="text-xl font-semibold mb-8 text-center">DETAILS</h2>
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
      <div className="mt-16 flex gap-12">
        <div>
          <img className="w-52 rounded-md" src={servicePhotoURL} alt="" />
          <p className="mt-4 text-xs">{_id}</p>
          <p className="font-bold text-lg my-1">{service}</p>
          <p className="font-bold text-lg">৳{amount}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Schedule</h3>
          <p className="text-lg">
            <span className="font-semibold">Date:</span> {selectedDate}
          </p>
          <h3 className="font-semibold text-lg mt-8 mb-3">Ordered for</h3>
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
        <button className="btn btn-active btn-accent text-white">
          Download Invoice
        </button>
        {(bookingStatus === "Order Placed" ||
          bookingStatus === "Order Confirmed") && (
          <button className="btn btn-error text-white">Cancel</button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
