import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

const Invoices = () => {
  const { user } = useContext(AuthContext);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-invoices"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/payments/${user.uid}`
      ).then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message, {});
  }

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center px-4">
        <Loading />
      </div>
    );
  }

  const handleDownloadInvoice = (booking) => {
    window.location.replace(
      `https://anyapi.io/api/v1/invoice/generate?apiKey=9cmbqv1tfaou1l8c2eepi8fi39f3s1sbfja2jo3gvg86j424q9l71g&number=${booking.invoiceNumber}&logo=https://i.postimg.cc/CKDMny4Y/subidha-logo.png&amount_paid=${booking.totalAmount}&items[0][quantity]=${booking.serviceQuantity}&items[0][unit_cost]=${booking.unitCost}&currency=BDT&items[0][name]=${booking.service}&date=${booking.invoiceDate}`
    );
  };

  const filteredBookings = bookings.filter((booking) => {
    const invoiceDate = new Date(booking.invoiceDate);
    return (
      (!fromDate || invoiceDate >= new Date(fromDate)) &&
      (!toDate || invoiceDate <= new Date(toDate))
    );
  });

  const handleClearDate = () => {
    setFromDate(null);
    setToDate(null);
  };

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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

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
    <div className="px-4">
      <div className="flex justify-end">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/user-dashboard/dashboard">User Dashboard</Link>
            </li>
            <li>Invoices</li>
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-8 text-center">Invoices</h2>

      <div className="flex mb-4 gap-3 justify-end">
        <div className="flex">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="From Date"
            className="input input-bordered"
          />
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="To Date"
            className="input input-bordered ml-2"
          />
        </div>
        <button onClick={handleClearDate} className="btn btn-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-end items-center mb-4">
        <label htmlFor="itemsPerPage" className="mr-2">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="select select-bordered"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      {filteredBookings.length > 0 ? (
        <div className="overflow-x-auto custom-user-scrollbar py-10">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>InvoiceNo</th>

                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((booking, idx) => (
                <tr key={idx}>
                  <td className="font-semibold whitespace-nowrap">
                    I-{booking.invoiceNumber}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={booking.servicePhotoURL} alt="Service" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold whitespace-nowrap">
                          {booking.service}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{booking.invoiceDate}</td>
                  <td className="font-semibold">{booking.totalAmount} TK</td>
                  <td className="font-semibold text-green-600 p-2 whitespace-nowrap">
                    Payment Completed
                  </td>
                  <td>
                    <button
                      onClick={() => handleDownloadInvoice(booking)}
                      className="btn btn-neutral"
                    >
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center relative">
          <img src={noDataFound} alt="No data found" />
        </div>
      )}

      {filteredBookings.length > 0 && (
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
      )}
    </div>
  );
};

export default Invoices;
