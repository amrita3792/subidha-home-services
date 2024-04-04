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
  } = booking;

  return (
    <div className="mb-28">
      <h2 className="text-xl font-semibold mb-8 text-center">DETAILS</h2>
      <ul className="steps steps-vertical lg:steps-horizontal w-full">
        <li className="step step-primary font-semibold">Order Placed</li>
        <li className="step font-semibold">Order Confirmed</li>
        <li className="step font-semibold">Order Processing</li>
        <li className="step font-semibold">Order Completed</li>
      </ul>
      <div className="mt-16 flex gap-4">
        <div>
          <img className="w-52 rounded-md" src={servicePhotoURL} alt="" />
          <p className="mt-4 text-xs">{_id}</p>
          <p className="font-bold text-xl my-1">{service}</p>
          <p className="font-bold text-xl">৳{amount}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Schedule</h3>
          <p className="text-lg">Date: {selectedDate}</p>
          <h3 className="font-semibold text-lg mt-8">Ordered for</h3>
          <p className="text-lg">{userName}</p>
          <p>{userPhone}</p>
          <p className="white">
            {fullAddress}
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
      <button className="btn btn-active btn-accent mt-8">
        Download Invoice
      </button>
    </div>
  );
};

export default BookingDetails;
