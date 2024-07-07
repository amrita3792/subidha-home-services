import { useContext, useState, useEffect } from "react";
import AddStaffModal from "../../../Components/AddStaffModal/AddStaffModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Staffs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { user } = useContext(AuthContext);

  const {
    data: staffs = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: () =>
      fetch(`https://subidha-home-services-server3792.glitch.me/staff/${user.uid}`).then(
        (res) => res.json()
      ),
  });

  const handleChangeModalState = async () => {
    await setModalOpen((prev) => !prev);
    await document.getElementById("add-staff")?.showModal();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  const filteredStaffs = staffs.filter((staff) => {
    return (
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.dateOfBirth.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.gender.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaffs = filteredStaffs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);

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
    <div className="bg-white p-10 shadow-sm rounded-xl">
      <h3 className="font-semibold text-2xl">My Staffs</h3>
      <div className="flex justify-between my-8">
        <input
          type="text"
          placeholder="Search Staffs"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs input-info"
        />
        <button
          onClick={handleChangeModalState}
          className="btn btn-neutral flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add Staff</span>
        </button>
      </div>
      <div className="flex justify-end my-4">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="select select-bordered max-w-xs select-info"
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
              <th>Phone</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStaffs.map((staff) => (
              <tr key={staff._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={staff.photo} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{staff.name}</div>
                    </div>
                  </div>
                </td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.dateOfBirth}</td>
                <td>{staff.gender}</td>
                <td>
                  <button className="btn btn-info btn-sm text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                  <button className="btn btn-error btn-sm ml-2 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStaffs.length)} of {filteredStaffs.length} entries
        </div>
        <div className="btn-group flex gap-2">
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
      {modalOpen && (
        <AddStaffModal refetch={refetch} handleChangeModalState={handleChangeModalState} />
      )}
    </div>
  );
};

export default Staffs;
