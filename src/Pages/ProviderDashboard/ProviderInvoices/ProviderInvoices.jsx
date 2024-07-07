import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

const ProviderInvoices = () => {
  const { user } = useContext(AuthContext);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: invoices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["provider-invoices"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/provider-payments/${user.uid}`
      ).then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message, {});
  }

  console.log(invoices);

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center mt-10">
        <Loading />
      </div>
    );
  }

  const handleDownloadInvoice = (booking) => {
    window.location.replace(
      `https://anyapi.io/api/v1/invoice/generate?apiKey=9cmbqv1tfaou1l8c2eepi8fi39f3s1sbfja2jo3gvg86j424q9l71g&number=${booking.invoiceNumber}&logo=https://i.postimg.cc/CKDMny4Y/subidha-logo.png&amount_paid=${booking.totalAmount}&items[0][quantity]=${booking.serviceQuantity}&items[0][unit_cost]=${booking.unitCost}&currency=BDT&items[0][name]=${booking.service}&date=${booking.invoiceDate}`
    );
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.invoiceDate);
    return (
      (!fromDate || invoiceDate >= new Date(fromDate)) &&
      (!toDate || invoiceDate <= new Date(toDate))
    );
  });

  const handleClearDate = () => {
    setFromDate(null);
    setToDate(null);
  };

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const currentItems = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-8">Invoices</h2>

        <div className="flex mb-4 gap-3 justify-end">
          <div className="flex">
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="From Date"
              className="input input-bordered select-info"
            />
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="To Date"
              className="input input-bordered ml-2 select-info"
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
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="select select-bordered input-accent select-info"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {filteredInvoices.length > 0 ? (
        <div className="overflow-x-auto py-10">
          <table className="table table-zebra">
            <thead>
              <tr className="text-base bg-gray-200">
                <th>InvoiceNo</th>
                <th>User</th>
                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((invoice, idx) => (
                <tr key={idx}>
                  <td className="font-semibold">I - {invoice.invoiceNumber}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={invoice.userPhotoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{invoice.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={invoice.servicePhotoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{invoice.service}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{invoice.invoiceDate}</td>
                  <td className="font-semibold">{invoice.totalAmount} TK</td>
                  <td className="font-semibold text-green-600 p-2">
                    Payment Completed
                  </td>
                  <td>
                    <button
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="btn btn-info text-white"
                    >
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-neutral"
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => handlePageChange(number + 1)}
                  className={`btn ${currentPage === number + 1 ? "btn-neutral" : "btn-outline"
                    }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-neutral"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center relative">
          <img src={noDataFound} alt="No data found" />
        </div>
      )}
    </div>
  );
};

export default ProviderInvoices;
