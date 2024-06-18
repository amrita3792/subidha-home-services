import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DepositHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: deposits = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["deposits"],
    queryFn: () =>
      fetch(`https://example.com/api/deposits`).then((res) => res.json()),
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const filteredDeposits = deposits.filter((deposit) => {
    return (
      deposit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.amount.toString().includes(searchQuery.toLowerCase()) ||
      deposit.depositedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.depositedAt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeposits = filteredDeposits.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isError) {
    toast.error(error.message, {
      theme: "colored",
    });
  }

  if (isLoading) {
    return (
      <div className="w-full top-0 left-0 h-full flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-10">
      <h2 className="text-2xl font-semibold mb-8">Provider Deposit History</h2>
      <div className="flex justify-between mb-8">
        <input
          type="text"
          placeholder="Search Deposits"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="select select-bordered max-w-xs"
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Deposited By</th>
              <th>Status</th>
              <th>Deposited At</th>
            </tr>
          </thead>
          <tbody>
            {currentDeposits.length > 0 ? (
              currentDeposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td>{deposit.name}</td>
                  <td>{deposit.date}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.depositedBy}</td>
                  <td>{deposit.status}</td>
                  <td>{deposit.depositedAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDeposits.length)} of {filteredDeposits.length} entries
        </div>
        <div className="btn-group">
          <button onClick={handlePrevPage} className="btn" disabled={currentPage === 1}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn ${index + 1 === currentPage ? "btn-active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} className="btn" disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositHistory;
