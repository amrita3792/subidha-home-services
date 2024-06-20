import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import Loading from "../../../Components/Loading/Loading";

const CurrentMonthBookings = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCurrentMonthBookings = async () => {
    const response = await fetch(
      `https://subidha-home-services-server3792.glitch.me/provider-bookings/${user.uid}`
    );
    const bookings = await response.json();
    
    // Filter bookings for the current month
    const currentMonthBookings = bookings.filter((booking) =>
      dayjs(booking.selectedDate).isSame(dayjs(), 'month')
    );
    
    return currentMonthBookings;
  };

  const { data: bookings = [], isLoading, isError, error } = useQuery({
    queryKey: ["current-month-bookings", user.uid],
    queryFn: fetchCurrentMonthBookings,
  });

  if (isError) {
    toast.error(error.message);
  }

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center mt-10">
        <Loading />
      </div>
    );
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.selectedDate?.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="bg-white p-10 rounded-xl shadow-md my-10">
      <h2 className="text-2xl font-semibold mb-8">Recent Bookings</h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-sm"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="select select-bordered"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      {currentBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto table-zebra w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-2 px-3 text-left">User Name</th>
                <th className="py-2 px-3 text-left">Service</th>
                <th className="py-2 px-3 text-left">Selected Date</th>
                <th className="py-2 px-3 text-left">Selected Time Slot</th>
                <th className="py-2 px-3 text-left">Total Amount</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{booking.userName}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <img src={booking.servicePhotoURL} alt={booking.service} className="w-10 h-10 object-cover rounded-full mr-2" />
                      {booking.service}
                    </div>
                  </td>
                  <td className="py-3 px-4">{booking.selectedDate}</td>
                  <td className="py-3 px-4">{booking.selectedSlot}</td>
                  <td className="py-3 px-4">BDT {booking.totalAmount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-lg text-sm ${booking.bookingStatus === "Order Completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-800"}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/bookings/${booking._id}`} className="text-blue-600 hover:underline">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10">
          <img src={noDataFound} alt="No Data Found" className="mx-auto" />
          <p className="mt-4 text-gray-600">No bookings found for the current month.</p>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className={`btn btn-outline mr-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center px-2">
          {currentPage} of {totalPages}
        </span>
        <button
          className={`btn btn-outline ml-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
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

export default CurrentMonthBookings;

