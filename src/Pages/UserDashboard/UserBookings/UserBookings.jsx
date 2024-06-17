import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext, ThemeContext } from "../../../App";
import { Link } from "react-router-dom";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";
import "react-toastify/dist/ReactToastify.css";
import "daisyui/dist/full.css";

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
      booking.userEmail.toLowerCase().includes(term) ||
      booking.fullAddress.toLowerCase().includes(term) ||
      booking.providerName.toLowerCase().includes(term) ||
      booking._id.toLowerCase().includes(term) ||
      booking.fullAddress.toLowerCase().includes(term) ||
      booking.selectedWeekDay.toLowerCase().includes(term) ||
      booking.bookingStatus.toLowerCase().includes(term) ||
      booking.selectedDate.toLowerCase().includes(term)
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

  if (isError) {
    toast.error(error.message, {});
  }

  if (!isLoading && !bookings.length) {
    return (
      <div className="flex flex-col justify-center items-center relative">
        <img src={noDataFound} alt="No data found" />
      </div>
    );
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn ${currentPage === i ? "btn-primary" : "btn-ghost"}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="h-full px-5">
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
                  Booking List
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
          <div className="overflow-x-scroll">
            <table
              className={`table ${
                theme === "light" ? "border" : "border-slate-600"
              }`}
            >
              <thead
                className={`border ${
                  theme === "light" ? "border" : "border-slate-600"
                }`}
              >
                <tr className="text-sm">
                  <th>Booking ID</th>
                  <th>Service</th>
                  <th>Schedule</th>
                  <th>Price</th>
                  <th>Provider</th>
                  <th>Details</th>
                  <th>Review</th>
                  <th>Chat</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((booking) => (
                  <tr
                    className={`border ${
                      theme === "light" ? "border" : "border-slate-600"
                    }`}
                    key={booking._id}
                  >
                    <td className="flex flex-col items-start gap-1">
                      <span className="text-lg whitespace-nowrap">B-{booking._id}</span>
                      <span
                        className={`text-white text-xs p-1 rounded-md font-semibold ${
                          booking.bookingStatus === "Cancelled by User"
                            ? "bg-red-500"
                            : "bg-green-700"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={booking.servicePhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold whitespace-nowrap">{booking.service}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm font-semibold">
                      <span className="whitespace-nowrap">{booking.selectedDate}</span><br />
                      [{booking.selectedSlot}]
                    </td>
                    <td className="font-semibold whitespace-nowrap">
                      {booking.totalAmount} TK
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={booking.providerPhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold whitespace-nowrap">{booking.providerName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link
                        to={`/user-dashboard/booking-list/${booking._id}`}
                        className="btn btn-ghost btn-xs bg-[#FF6600] text-white hover:text-black"
                      >
                        details
                      </Link>
                    </td>
                    <td>
                      {booking?.paidStatus && (
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
                      )}
                    </td>
                    <td>
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
                    </td>
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
            {renderPageNumbers()}
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
