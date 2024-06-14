import { useContext, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { getCurrentDateTime, getWeekday } from "../../../utilities/date";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import contactPerson from "../../../assets/icons/contact-person.png";
import address from "../../../assets/icons/favorite-location.png";
import service from "../../../assets/icons/service.png";
import rebuildingService from "../../../assets/icons/rebuilding-service.png";
import orderList from "../../../assets/icons/order-list.png";
import schedule from "../../../assets/icons/schedule.png";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({
  handleChangeModalState,
  userData,
  subCategory,
  serviceMan,
  amount,
}) => {
  // console.log(serviceMan);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [remainingSlots, setRemainingSlots] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(timeSlots);

  const navigate = useNavigate();

  let footer = <p>Please pick a day.</p>;
  if (selectedDate) {
    footer = (
      <p className="font-semibold">You picked {format(selectedDate, "PP")}.</p>
    );
  }

  useEffect(() => {
    if (selectedDate) {
      fetch(
        `http://localhost:5000/get-available-slots?serviceManId=${
          serviceMan.uid
        }&selectedDate=${format(
          selectedDate,
          "PP"
        )}&selectedWeekDay=${getWeekday(format(selectedDate, "PP"))}`
      )
        .then((res) => res.json())
        .then((data) => setTimeSlots(data));
    }
  }, [selectedDate]);

  function datesAreEqual(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  useEffect(() => {
    const calculateDisabledSlots = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeIndex = Math.floor(currentHour - 9); // Assuming slots start from 9 AM

      const disabled = timeSlots.filter((slot, index) => {
        if (
          index < currentTimeIndex ||
          (index === currentTimeIndex && currentMinute > 0)
        ) {
          return slot; // Slot is in the past
        } else if (index - currentTimeIndex > 2) {
          return false; // Slot is more than 2 hours in the future
        } else {
          return slot; // Slot is valid
        }
      });

      console.log(selectedDate);

      if (datesAreEqual(selectedDate, now)) {
        const remainingSlots = timeSlots.filter(
          (slot) => !disabled.includes(slot)
        );
        setRemainingSlots(remainingSlots);
      } else {
        setRemainingSlots(timeSlots);
      }
    };

    calculateDisabledSlots();

    // Update disabled slots every minute
    const interval = setInterval(() => {
      calculateDisabledSlots();
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Clean up interval
  }, [timeSlots]); // Empty dependency array means this effect runs only once on mount

  console.log(disabledSlots);

  const handleIncrease = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleClickSlot = (e) => {
    setSelectedSlot(e.target.innerText);
    console.log(e.target.innerText);
  };

  const handleSubmitBookingInfo = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    // const selectedWeekDay = getWeekday(format(selectedDate, "PP"));

    const bookingInfo = {
      userUID: userData.uid,
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
      userPhotoURL: userData.photoURL,
      userPhone: formData.get("userPhone"),
      division: formData.get("division"),
      district: formData.get("district"),
      upazila: formData.get("upazila"),
      fullAddress: formData.get("fullAddress"),
      serviceID: subCategory._id,
      service: subCategory.serviceName,
      servicePhotoURL: subCategory.image,
      selectedDate: format(selectedDate, "PP"),
      selectedWeekDay: getWeekday(format(selectedDate, "PP")),
      selectedSlot,
      totalAmount: amount * quantity,
      updated: getCurrentDateTime(),
      serviceQuantity: quantity,
      serviceManUID: serviceMan.uid,
      providerName: serviceMan.name,
      providerEmail: serviceMan.email,
      providerPhone: serviceMan.phone,
      providerPhotoURL: serviceMan.photoURL,
      unitCost: parseInt(amount),
      bookingStatus: "Order Placed",
    };

    console.log(bookingInfo);
    // Perform any necessary actions, such as sending the data to a server
    // For example, you can use fetch API to send a POST request to a server endpoint
    fetch("https://subidha-home-services-server3792.glitch.me/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking Created Successfully", {
            hideProgressBar: true,
            // theme: "colored",
          });
          setIsLoading(false);
          handleChangeModalState();
          navigate("/user-dashboard/booking-list");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        // Optionally, show an error message to the user
        alert("Failed to submit booking. Please try again later.");
        setIsLoading(false);
      });
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
        <div className="flex flex-col md:flex-row gap-5">
          <div>
            <img className="w-16" src={schedule} alt="" />
          </div>
          <div className="grow">
            <h3 className="text-lg font-semibold">Schedule</h3>
            <p className="font-semibold text-sm">
              Date and time selectors for scheduling appointments
            </p>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                footer={footer}
              />
            </div>
            <p className="text-center">
              Select your prefer time, expert will arrive by your selected time
            </p>
            <div className="grid grid-cols-5 gap-5 mt-5">
              {remainingSlots?.map((timeSlot, idx) => (
                <button
                  onClick={handleClickSlot}
                  key={idx}
                  className={`btn ${
                    timeSlot === selectedSlot && "bg-gray-200"
                  } btn-outline btn-info`}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-action justify-start">
          <form
            onSubmit={handleSubmitBookingInfo}
            className="w-full flex flex-col gap-8"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img className="w-16" src={contactPerson} alt="" />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Contact Person</h3>
                <p className="font-semibold text-sm">
                  Expert will contact with the follwing person
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  <input
                    required
                    name="userName"
                    type="text"
                    placeholder="Type the name of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.userName}
                  />
                  <input
                    required
                    name="userPhone"
                    type="text"
                    placeholder="Type the phone number of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.phoneNumber}
                  />
                  <input
                    required
                    name="userEmail"
                    type="text"
                    placeholder="Email"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.email}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img className="w-16" src={address} alt="" />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="font-semibold text-sm">
                  Expert will arrive at the address given below
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  <input
                    required
                    name="division"
                    type="text"
                    placeholder="Type the name of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.division}
                    // disabled={userData.division}
                  />
                  <input
                    required
                    name="district"
                    type="text"
                    placeholder="Type the phone number of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none font-semibold text-sm"
                    defaultValue={userData.district}
                    // disabled={userData.district}
                  />
                  <input
                    required
                    name="upazila"
                    type="text"
                    placeholder="Type the phone number of the contact person"
                    className="input input-bordered w-full min-w-xs focus:outline-none border font-semibold text-sm"
                    defaultValue={userData.upazila}
                    // disabled={userData.upazila}
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
                <img className="w-16" src={service} alt="" />
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
                <img className="w-16" src={rebuildingService} alt="" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Provider</h3>
                <p className="text-sm font-semibold mb-5">
                  Our service provider will contact you to confirm the following
                  service
                </p>

                <img
                  className="w-full md:w-96 rounded-xl"
                  src={serviceMan.photoURL}
                  alt=""
                />
                <h3 className="font-semibold my-3">
                  {serviceMan.name} (Provider)
                </h3>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 lg:w-[50%]">
              <div>
                <img className="w-16" src={orderList} alt="" />
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
                      <p>৳ {amount * quantity}</p>
                      <p>0</p>
                      <p>0</p>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="flex justify-between gap-3 text-sm font-semibold">
                  <p className="font-semibold">Amount to be paid</p>
                  <p className="flex justify-end">৳ {amount * quantity}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end w-full">
              <button className="mt-3 btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-4 h-fit rounded-lg">
                {isLoading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
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
