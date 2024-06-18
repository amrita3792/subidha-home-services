import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProviderBookings = () => {
  const { user } = useContext(AuthContext);
  const { receiver, setReceiver } = useContext(ChatContext);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Order Placed");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchBookingData = async () => {
    const response = await fetch(
      `https://subidha-home-services-server3792.glitch.me/provider-bookings/${user.uid}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  const {
    data: bookings = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["provider-bookings"],
    queryFn: fetchBookingData,
  });

  const handleStatusChange = (event, bookingId) => {
    setStatus(event.target.value);
    if (confirm("Are you sure you want to update status?") === true) {
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
                theme: "colored",
              }
            );
            refetch();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const filterBookings = (booking) => {
    const term = searchTerm.toLowerCase();
    return (
      booking.service.toLowerCase().includes(term) ||
      booking.userName.toLowerCase().includes(term) ||
      booking.bookingStatus.toLowerCase().includes(term) ||
      booking.selectedDate.toLowerCase().includes(term) ||
      booking.amount?.toString().includes(term) ||
      booking.serviceQuantity?.toString().includes(term) ||
      booking.fullAddress.toLowerCase().includes(term) ||
      booking.upazila.toLowerCase().includes(term) ||
      booking.district.toLowerCase().includes(term) ||
      booking.division.toLowerCase().includes(term)
    );
  };

  const filteredBookings = bookings.filter(filterBookings);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBookings.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) {
      return; // Exit the function if the user cancels the confirmation dialog
    }

    try {
      const response = await fetch(
        `https://subidha-home-services-server3792.glitch.me/booking-status/${bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled by Provider" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
      toast.success("Booking cancelled successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="h-full bg-white p-10 shadow-md rounded-xl">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="search"
              placeholder="Search..."
              className="input input-bordered input-info w-full max-w-xs"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="flex items-center gap-2">
              <span>Items per page:</span>
              <select
                className="select select-bordered select-info"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={2}>2</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-8">Booking List</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base">
                  <th>Booking Details</th>
                  <th>User Details</th>
                  <th>Update Status</th>
                  <th>Chat</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <div className="card card-side bg-base-100 justify-start">
                        <figure className="basis-1/2">
                          <img
                            className="rounded-xl w-full"
                            src={booking.servicePhotoURL}
                            alt="Movie"
                          />
                        </figure>
                        <div className="card-body">
                          <div className="font-bold text-xl">
                            {booking.service}
                            <br />
                            <span
                              className={`text-sm p-1 ${
                                booking.bookingStatus === "Cancelled by User" ||
                                booking.bookingStatus ===
                                  "Cancelled by Admin" ||
                                booking.bookingStatus ===
                                  "Cancelled by Provider"
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
                            {booking.totalAmount} Taka
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Quantity:</span>{" "}
                            {booking.serviceQuantity}
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Time Slot:</span>{" "}
                            {booking.selectedSlot} [{booking.selectedWeekDay}]
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
                      <div className="card card-compact bg-base-100">
                        <figure className="w-28 rounded-xl">
                          <img src={booking.userPhotoURL} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                          <div className="text-sm whitespace-nowrap">
                            <span className="font-bold">User Name:</span>{" "}
                            {booking.userName}
                          </div>
                          <div className="text-sm whitespace-nowrap">
                            <span className="font-bold">Phone:</span>{" "}
                            {booking.userPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {!(
                        booking.bookingStatus === "Cancelled by User" ||
                        booking.bookingStatus === "Order Completed" ||
                        booking.bookingStatus === "Cancelled by Admin" ||
                        booking.bookingStatus === "Cancelled by Provider"
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
                          if (receiver?.uid === booking?.userID) {
                            return;
                          } else {
                            setReceiver({
                              uid: booking.userID,
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
                      booking.bookingStatus === "Order Completed" ||
                      booking.bookingStatus === "Cancelled by Admin" ||
                      booking.bookingStatus === "Cancelled by Provider"
                    ) && (
                      <th>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="btn bg-red-500 py-3 text-white hover:text-black whitespace-nowrap"
                        >
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
          <div className="mt-5 flex justify-center gap-3">
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <ConfirmationModal />
    </div>
  );
};

export default ProviderBookings;
