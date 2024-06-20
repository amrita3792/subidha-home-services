import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

const ProviderInovices = () => {
  const { user } = useContext(AuthContext);
  // const {} = useContext(ProviderCo)
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const {
    data: invoices = [],
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

  return (
    <div className="bg-white p-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-8">Invoices</h2>

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
              {filteredInvoices.map((invoice, idx) => (
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
                        <div className="font-bold">{invoice.providerName}</div>
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
    </div>
  );
};

export default ProviderInovices;
