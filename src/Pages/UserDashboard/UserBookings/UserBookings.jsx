import  { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext, ThemeContext } from "../../../App";
import { Link } from "react-router-dom";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faStar,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "daisyui/dist/full.css";
import Loading from "../../../Components/Loading/Loading";

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
        `https://subidha-home-services-server3792.glitch.me/user-bookings/${user.uid}`
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
          className={`btn ${
            currentPage === i ? "btn-primary" : "btn-ghost"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="h-full px-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-8">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/user-dashboard/dashboard">User Dashboard</Link>
                </li>
                <li>Booking List</li>
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
          <div className="space-y-4">
            {currentItems.map((booking) => (
              <div
                key={booking._id}
                className={`card shadow-md p-4 ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    {booking.service}
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-lg text-sm ${
                      booking.bookingStatus === "Order Completed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>
                <div className="flex gap-4 mb-4">
                  <img
                    src={booking.servicePhotoURL}
                    alt="Service"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <p className="text-sm">
                      Booking Date: {booking.selectedDate}
                    </p>
                    <p className="text-sm">
                      Booking Time: {booking.selectedSlot}
                    </p>
                    <p className="text-sm">
                      Location: {booking.fullAddress}
                    </p>
                    <p className="text-sm">
                      Amount: {booking.totalAmount} TK
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={booking.providerPhotoURL}
                        alt="Provider"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <p className="text-sm">
                        Provider: {booking.providerName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => {
                      if (
                        receiver?.uid === booking?.providerID
                      ) {
                        return;
                      } else {
                        setReceiver({
                          uid: booking.providerID,
                          photoURL: booking.providerPhotoURL,
                          userName: booking.providerName,
                        });
                      }
                    }}
                    className="btn btn-ghost btn-xs bg-[#007BFF] text-white hover:text-black"
                  >
                    <FontAwesomeIcon
                      icon={faComments}
                      className="mr-1"
                    />
                    Chat
                  </button>
                  <Link
                    to={`/user-dashboard/booking-list/${booking._id}`}
                    className="btn btn-ghost btn-xs bg-[#28A745] text-white hover:text-black"
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="mr-1"
                    />
                    Details
                  </Link>
                  {booking?.paidStatus && (
                    <button
                      disabled={booking.hasWrittenReview}
                      onClick={() => {
                        setReviewService(booking);
                        handleChangeModalState();
                      }}
                      className={`btn btn-ghost btn-xs ${
                        booking.hasWrittenReview
                          ? "bg-neutral text-white cursor-not-allowed"
                          : "bg-[#FFC107] text-black hover:text-black"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className="mr-1"
                      />
                      {booking.hasWrittenReview
                        ? "Reviewed"
                        : "Review"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className={`btn ${
                currentPage === 1
                  ? "btn-primary cursor-not-allowed"
                  : "btn-primary"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className={`btn ${
                currentPage === totalPages
                  ? "btn-primary cursor-not-allowed"
                  : "btn-primary"
              }`}
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
