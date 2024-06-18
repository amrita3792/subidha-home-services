import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";

const Payment = () => {
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-payments"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/payments/${user.uid}`
      ).then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message);
  }

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.date?.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn btn-outline ${currentPage === i ? "btn-active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="px-4">
      <div className="flex justify-end">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/user-dashboard/dashboard">User Dashboard</Link>
            </li>
            <li>
              <Link to="/user-dashboard/user-payment">Payments</Link>
            </li>
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Payment History
      </h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered"
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
        <div className="overflow-x-auto py-10">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>BookingID</th>
                <th>Provider</th>
                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, idx) => (
                <tr key={idx}>
                  <td className="font-semibold whitespace-nowrap">B - {booking._id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={booking.providerPhotoURL} alt="Provider" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold whitespace-nowrap">{booking.providerName}</div>
                      
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={booking.servicePhotoURL} alt="Service" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold whitespace-nowrap">{booking.service}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{booking.invoiceDate}</td>
                  <td className="font-semibold">{booking.totalAmount} TK</td>
                  <td className="font-semibold text-green-600 p-2 whitespace-nowrap">
                    Payment Completed
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center py-10">
          <img src={noDataFound} alt="No Data Found" />
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-outline mr-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPaginationButtons()}
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

export default Payment;
