import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "daisyui/dist/full.css";

const AdminBookingManagement = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch bookings
  const fetchBookings = async () => {
    const response = await fetch("http://localhost:5000/all-bookings");
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
    try {
      const response = await fetch(
        `http://localhost:5000/all-bookings/${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingStatus: "Cancelled by Admin" }),
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
        `http://localhost:5000/all-bookings/${bookingId}`,
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
      booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

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
                  <td>{booking._id}</td>
                  <td>
                    <img
                      src={booking.userPhotoURL}
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{booking.userUID}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.userPhone}</td>
                  <td>
                    <img
                      src={booking.providerPhotoURL}
                      alt="Provider"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{booking.serviceManUID}</td>
                  <td>{booking.providerName}</td>
                  <td>{booking.providerEmail}</td>
                  <td>{booking.providerPhone}</td>
                  <td>{booking.service}</td>
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
                  <td>{booking.selectedDate}</td>
                  <td>{booking.selectedSlot}</td>
                  <td>{booking.selectedWeekDay}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>{booking.updated}</td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-warning btn-sm text-white"
                      disabled={booking.bookingStatus === "Cancelled by Admin"}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="btn btn-error btn-sm ml-2 text-white"
                    >
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
