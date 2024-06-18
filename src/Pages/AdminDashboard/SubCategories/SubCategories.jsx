import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SubCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      fetch("https://subidha-home-services-server3792.glitch.me/all-services").then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message, {
      
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      service._id.toLowerCase().includes(query) ||
      service.serviceName.toLowerCase().includes(query) ||
      service.subCategories.some((subCategory) =>
        subCategory.serviceName.toLowerCase().includes(query)
      )
    );
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mt-8">Sub Categories</h2>
      <div className="mb-4 flex justify-between items-center mt-10">
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered input-info w-full max-w-xs"
        />
        <div className="flex items-center gap-3">
          <p>Items per page:</p>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="select select-bordered"
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Sub Categories</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {displayedServices.map((serviceCategory) => (
              <tr className="mb-8" key={serviceCategory._id}>
                <td className="font-semibold">#{serviceCategory._id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={serviceCategory.icon}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {serviceCategory.serviceName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>SubCategory Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceCategory?.subCategories?.map((subCategory) => (
                        <tr className="mb-4" key={subCategory.id}>
                          <td className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={subCategory.image}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {subCategory.serviceName}
                              </div>
                            </div>
                          </td>
                          <td>
                            <button className="btn btn-neutral text-white">
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
                </td>
                <td>
                  <input
                    readOnly
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={serviceCategory.isFeatured === "yes"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
