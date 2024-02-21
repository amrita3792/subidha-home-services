import React, { useState } from "react";

const BookingModal = ({
  handleChangeModalState,
  userData,
  subCategory,
  serviceMan,
}) => {
  console.log(serviceMan);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => prevQuantity + 1);
    // onChange(quantity + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      // onChange(quantity - 1);
    }
  };

  return (
    <dialog id="booking_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl custom-scrollbar rounded-lg">
        <button
          onClick={handleChangeModalState}
          className="btn btn-circle absolute right-4 top-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="font-bold text-2xl text-center mb-14">Booking Form</h3>
        <div className="modal-action justify-start">
          <form className="w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img
                  className="w-16"
                  src="https://i.ibb.co/rkN6vW3/contact-1.png"
                  alt=""
                />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Contact Person</h3>
                <p className="font-semibold text-sm">
                  Expert will contact with the follwing person
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  <input
                    name="name"
                    type="text"
                    placeholder="Type the name of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.userName}
                  />
                  <input
                    name="phone"
                    type="text"
                    placeholder="Type the phone number of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.phoneNumber}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img
                  className="w-16"
                  src="https://i.ibb.co/vXgd1cy/favorite-location.png"
                  alt=""
                />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="font-semibold text-sm">
                  Expert will arrive at the address given below
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  <input
                    name="division"
                    type="text"
                    placeholder="Type the name of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.division}
                    disabled={userData.division}
                  />
                  <input
                    name="district"
                    type="text"
                    placeholder="Type the phone number of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.district}
                    disabled={userData.district}
                  />
                  <input
                    name="upazila"
                    type="text"
                    placeholder="Type the phone number of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none border font-semibold text-sm"
                    defaultValue={userData.upazila}
                    disabled={userData.upazila}
                  />
                  <textarea
                    name="fullAddress"
                    className="textarea textarea-bordered md:col-span-2 h-40 focus:outline-none font-semibold text-sm"
                    placeholder="Full address"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img
                  className="w-16"
                  src="https://i.ibb.co/zVPQWW7/service.png"
                  alt=""
                />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Service Detail</h3>
                <p className="text-sm font-semibold">
                  Our service provider will contact you to confirm the following
                  service
                </p>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
                    <h3 className="font-semibold text-2xl">
                      {subCategory.serviceName}
                    </h3>
                    <div className="flex items-center">
                      <button
                        onClick={handleDecrease}
                        className="px-3 py-1 bg-[#FF6600] text-white font-semibold rounded-l border-[#FF6600] "
                      >
                        -
                      </button>
                      <span className="px-3 py-2 text-gray-700  border-[#FF6600] text-sm font-bold">
                        {quantity} Unit
                      </span>
                      <button
                        onClick={handleIncrease}
                        className="px-3 py-1 rounded-r bg-[#FF6600] border-[#FF6600] font-semibold text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <img
                    className="w-full md:w-96 rounded-xl"
                    src={subCategory.image}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img
                  className="w-16"
                  src="https://i.ibb.co/4NLGRjj/rebuilding-service.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Provider</h3>
                <p className="text-sm font-semibold mb-5">
                  Our service provider will contact you to confirm the following
                  service
                </p>

                <img
                  className="w-24 h-24 rounded-full"
                  src={serviceMan.photoURL}
                  alt=""
                />
                <h3 className="font-semibold mb-3">
                  {serviceMan.name} (Provider)
                </h3>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 lg:w-[50%]">
              <div>
                <img
                  className="w-16"
                  src="https://i.ibb.co/0VSQksC/order-list.png"
                  alt=""
                />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <p className="font-semibold text-sm">
                  Thank you for booking with us. Below is a summary of your
                  order:
                </p>
                <div className="flex flex-col gap-3 mt-5">
                  <h3 className="font-semibold text-center">
                    {subCategory.serviceName}
                  </h3>
                  <hr />
                  <div className="overflow-x-auto flex gap-5 justify-between text-sm font-semibold">
                    <div>
                      <p>Subtotal</p>
                      <p>Delivery Charge</p>
                      <p>Discount</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p>৳ 1,199</p>
                      <p>0</p>
                      <p>0</p>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="flex justify-between gap-3 text-sm font-semibold">
                  <p className="font-semibold">Amount to be paid</p>
                  <p className="flex justify-end">৳ 1,199</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end w-full">
              <button
                onClick={handleChangeModalState}
                className="mt-3 btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-4 h-fit rounded-lg"
              >
                PLACE ORDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
