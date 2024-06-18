import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "daisyui/dist/full.css";

const AdminBookingManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch bookings
  const fetchBookings = async () => {
    const response = await fetch(
      "https://subidha-home-services-server3792.glitch.me/all-bookings"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  const {
    data: bookings = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

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
          body: JSON.stringify({ status: "Cancelled by Admin" }),
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

  const handleDeleteBooking = async (bookingId) => {
    // Ask for user confirmation before proceeding with the deletion
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      const response = await fetch(
        `https://subidha-home-services-server3792.glitch.me/all-bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      toast.success("Booking deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  // Filter and paginate bookings
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.fullAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.selectedWeekDay
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.bookingStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-10 rounded-lg shadow-md bg-white">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xl"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="select select-bordered ml-4"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-red-500">Error fetching bookings</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-base">
                <th>BookingID</th>
                <th>User Photo</th>
                <th>UserID</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Phone</th>
                <th>Provider Photo</th>
                <th>Provider ID</th>
                <th>Provider Name</th>
                <th>Provider Email</th>
                <th>Provider Phone</th>
                <th>Service</th>
                <th>Service Photo</th>
                <th>Service Quantity</th>
                <th>Unit Cost</th>
                <th>Total Amount</th>
                <th>Division</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Booking Address</th>
                <th>Selected Date</th>
                <th>Time Slot</th>
                <th>Selected Week Day</th>
                <th>Booking Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="whitespace-nowrap">B-{booking._id}</td>
                  <td>
                    <img
                      src={booking.userPhotoURL}
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{booking.userID}</td>
                  <td className="whitespace-nowrap">{booking.userName}</td>
                  <td className="whitespace-nowrap">{booking.userEmail}</td>
                  <td className="whitespace-nowrap">{booking.userPhone}</td>
                  <td>
                    <img
                      src={booking.providerPhotoURL}
                      alt="Provider"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{booking.providerID}</td>
                  <td className="whitespace-nowrap">{booking.providerName}</td>
                  <td className="whitespace-nowrap">{booking.providerEmail}</td>
                  <td className="whitespace-nowrap">{booking.providerPhone}</td>
                  <td className="whitespace-nowrap">{booking.service}</td>
                  <td>
                    <img
                      src={booking.servicePhotoURL}
                      alt="Service"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{booking.serviceQuantity}</td>
                  <td>{booking.unitCost}</td>
                  <td>{booking.totalAmount}</td>
                  <td>{booking.division}</td>
                  <td>{booking.district}</td>
                  <td>{booking.upazila}</td>
                  <td>{booking.fullAddress}</td>
                  <td className="whitespace-nowrap">{booking.selectedDate}</td>
                  <td className="whitespace-nowrap">{booking.selectedSlot}</td>
                  <td>{booking.selectedWeekDay}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg text-sm ${
                        booking.bookingStatus === "Order Completed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-gray-800"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">{booking.updated}</td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-warning btn-sm text-white"
                      disabled={
                        booking.bookingStatus === "Cancelled by Admin" ||
                        booking.bookingStatus === "Cancelled by User" ||
                        booking.bookingStatus === "Order Completed" ||
                        booking.bookingStatus === "Cancelled by Provider"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="btn btn-error btn-sm ml-2 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <button
          className="btn btn-outline mr-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn ${
              currentPage === pageNumber + 1 ? "btn-active" : "btn-outline"
            } mx-1`}
            onClick={() => setCurrentPage(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          className="btn btn-outline ml-2"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminBookingManagement;
