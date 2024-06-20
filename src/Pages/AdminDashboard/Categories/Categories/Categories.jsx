import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Categories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchServiceCategoriesData = async () => {
    const response = await fetch(
      "https://subidha-home-services-server3792.glitch.me/serviceCategories"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  const {
    data: allServiceCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service-categories"],
    queryFn: fetchServiceCategoriesData,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    toast.error("There was an error fetching services data.", {
      theme: "colored",
    });
    return null;
  }

  const handleNavigate = (id) => {
    navigate(`/admin-dashboard/edit-category/${id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever items per page is changed
  };

  const filteredCategories = allServiceCategories.filter(
    (category) =>
      category.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCategories.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white shadow-md p-10 rounded-lg">
      <h2 className="text-2xl font-semibold">Categories</h2>
      <div className="mt-5 flex justify-between items-center">
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
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          <thead>
            <tr className="text-base bg-gray-200">
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Featured</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category) => (
              <tr key={category._id}>
                <td className="font-semibold">{category._id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={category.icon}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{category.serviceName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    readOnly
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={category.isFeatured === "yes"}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleNavigate(category._id)}
                    className="btn btn-neutral text-white"
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
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
  );
};

export default Categories;
