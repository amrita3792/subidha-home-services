import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";
import noDataFound from "../../../assets/images/no-data-found.png";
import Loading from "../../../Components/Loading/Loading";

const ProviderPayments = () => {
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-payments"],
    queryFn: () =>
      fetch(
        `https://subidha-home-services-server3792.glitch.me/provider-payments/${user.uid}`
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.date?.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-8">Payment History</h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-sm input-info"
        />
        <div className="flex gap-2 items-center">
          <label>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="select select-bordered select-info"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      {currentPayments.length > 0 ? (
        <div className="overflow-x-auto py-10">
          <table className="table table-zebra">
            <thead>
              <tr className="text-base bg-gray-200">
                <th>BookingID</th>
                <th>User</th>
                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((payment, idx) => (
                <tr key={idx}>
                  <td className="font-semibold">
                    B - 
                    {
                      payment._id
                    }
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={payment.userPhotoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{payment.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={payment.servicePhotoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{payment.service}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{payment.invoiceDate}</td>
                  <td className="font-semibold">{payment.totalAmount} TK</td>
                  <td className="font-semibold text-green-600 p-2">
                    Payment Completed
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 flex justify-center">
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
        <div className="flex gap-2">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={`btn ${currentPage === number + 1 ? "btn-neutral" : "btn-outline"}`}
          >
            {number + 1}
          </button>
        ))}
        </div>
        <button
          className="btn btn-outline ml-2"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProviderPayments;
