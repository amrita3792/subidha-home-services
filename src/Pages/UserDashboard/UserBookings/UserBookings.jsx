import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext, ThemeContext } from "../../../App";
import { Link } from "react-router-dom";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const { receiver, setReceiver } = useContext(ChatContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewService, setReviewService] = useState("");
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: bookings = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/booking/${user.uid}`
      ).then((res) => res.json()),
  });

  const handleChangeModalState = async () => {
    await setIsModalOpen((prev) => !prev);
    document.getElementById("review-modal").showModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever items per page is changed
  };

  const filterBookings = (booking) => {
    const term = searchTerm.toLowerCase();
    return (
      booking.service.toLowerCase().includes(term) ||
      booking.providerName.toLowerCase().includes(term) ||
      booking.bookingStatus.toLowerCase().includes(term) ||
      booking.selectedDate.toLowerCase().includes(term) ||
      booking.totalAmount.toString().includes(term) ||
      booking.serviceQuantity.toString().includes(term) ||
      booking.fullAddress.toLowerCase().includes(term) ||
      booking.upazila.toLowerCase().includes(term) ||
      booking.district.toLowerCase().includes(term) ||
      booking.division.toLowerCase().includes(term)
    );
  };

  const filteredBookings = bookings.filter(filterBookings);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBookings.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isError) {
    toast.error(error.message, {
      
    });
  }

  if (!isLoading && !bookings.length) {
    return (
      <div className="flex flex-col justify-center items-center relative">
        <img src={noDataFound} alt="No data found" />
      </div>
    );
  }

  console.log(bookings);

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-8">
          <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/user-dashboard/dashboard">User Dashboard</Link>
                </li>
                <li>
                  <Link to="/user-dashboard/booking-list">Booking List</Link>
                </li>
              </ul>
            </div>

          </div>
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
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-8 text-center mt-10">
            My Bookings
          </h2>
          <div className="overflow-x-auto">
            <table
              className={`table ${theme === "light" ? "border" : "border-slate-600"}`}
            >
              <thead
                className={`border ${theme === "light" ? "border" : "border-slate-600"}`}
              >
                <tr className="text-sm">
                  <th>Booking Details</th>
                  <th>Service Provider</th>
                  <th>Message</th>
                  <th>Details</th>
                  <th>Review</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((booking) => (
                  <tr
                    className={`border ${theme === "light" ? "border" : "border-slate-600"}`}
                    key={booking._id}
                  >
                    <td>
                      <div className="flex flex-col gap-3">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-md">
                            <img
                              src={booking.servicePhotoURL}
                              alt="Service"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">
                            {booking.service} <br />
                            <span
                              className={`text-sm ${booking.bookingStatus === "Cancelled by User" ? "bg-red-500" : "bg-green-700"} text-white`}
                            >
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Booking Date:</span>{" "}
                            {booking.selectedDate}
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Total Amount:</span>{" "}
                            {booking.totalAmount} Taka
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Quantity:</span>{" "}
                            {booking.serviceQuantity}
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Location:</span>{" "}
                            {booking.fullAddress}, {booking.upazila},{" "}
                            {booking.district}, {booking.division}
                          </div>
                          <div className="text-sm">
                            <span className="font-bold">Time Slot:</span>{" "}
                            {booking.selectedSlot} [{booking.selectedWeekDay}]
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-3">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-md">
                            <img
                              src={booking.providerPhotoURL}
                              alt="Provider"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-bold">Provider Name:</span>{" "}
                            {booking.providerName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          if (receiver?.uid === booking?.serviceManUID) {
                            return;
                          } else {
                            setReceiver({
                              uid: booking.serviceManUID,
                              photoURL: booking.providerPhotoURL,
                              userName: booking.providerName,
                            });
                          }
                        }}
                        className="btn btn-ghost btn-xs bg-[#345DA7] text-white hover:text-black"
                      >
                        Chat
                      </button>
                    </th>
                    <th>
                      <Link
                        to={`/user-dashboard/booking-list/${booking._id}`}
                        className="btn btn-ghost btn-xs bg-[#FF6600] text-white hover:text-black"
                      >
                        details
                      </Link>
                    </th>
                    {booking?.paidStatus && (
                      <th>
                        <button
                          disabled={booking.hasWrittenReview}
                          onClick={() => {
                            setReviewService(booking);
                            handleChangeModalState();
                          }}
                          className="btn btn-ghost btn-xs bg-neutral text-white hover:text-black"
                        >
                          {booking.hasWrittenReview ? "Reviewed" : "Review"}
                        </button>
                      </th>
                    )}
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
      {isModalOpen && (
        <ReviewModal
          reviewService={reviewService}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default UserBookings;
