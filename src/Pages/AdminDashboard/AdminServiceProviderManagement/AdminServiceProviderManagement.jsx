import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "daisyui/dist/full.css";

const AdminServiceProviderManagement = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch service providers
  const fetchServiceProviders = async () => {
    const response = await fetch("http://localhost:5000/all-providers/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  const {
    data: serviceProviders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["service-providers"],
    queryFn: fetchServiceProviders,
  });

  const handleAcceptProvider = async (provider) => {
    try {
      const response = await fetch(
        `http://localhost:5000/all-providers/${provider._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...provider, role: "provider" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      toast.success("Role updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeactivateProvider = async (provider) => {
    try {
      const response = await fetch(
        `http://localhost:5000/all-providers/${provider._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...provider, role: "inactive" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      toast.success("Role updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteProvider = async (providerId) => {
    // Ask for user confirmation before proceeding with the deletion
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this provider?"
    );

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the action
    }

    try {
      const response = await fetch(
        `http://localhost:5000/all-providers/${providerId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete provider");
      }
      toast.success("Provider deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete provider");
    }
  };

  // Filter and paginate providers
  const filteredProviders = serviceProviders.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-10 rounded-lg shadow-md bg-white">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Service Providers</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="search"
          placeholder="Search by name, email or business name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xl"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="select select-bordered ml-4"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-red-500">Error fetching service providers</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-base">
                <th>ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Business Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProviders.map((provider) => (
                <tr key={provider._id}>
                  <td>#{provider.uid}</td>
                  <td>
                    <img
                      src={provider.photoURL}
                      alt="Provider"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{provider.name}</td>
                  <td>{provider.email}</td>
                  <td>{provider.businessName}</td>
                  <td>{provider.phone}</td>
                  <td>{provider.role}</td>
                  <td>
                    {provider.role !== "provider" ? (
                      <button
                        onClick={() => handleAcceptProvider(provider)}
                        className="btn btn-success btn-sm text-white"
                      >
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
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        Accept
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeactivateProvider(provider)}
                        className="btn btn-warning btn-sm text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1014.95 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.636-6.294A1 1 0 0012.12 7.88c.924.923 1.12 2.3.587 3.415l-1.992-1.992a.922.922 0 00-.018-.018l-6.99-6.991zM3.238 8.187a1 1 0 00-1.933-.516c-.8 3-.025 6.336 2.331 8.693a1 1 0 001.414-1.415 6.997 6.997 0 01-1.812-6.762zM7.4 11.5a1 1 0 10-1.73 1c.214.371.48.72.795 1.035a1 1 0 001.414-1.414c-.191-.191-.35-.4-.478-.622z" />
                        </svg>
                        Deactivate
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProvider(provider._id)}
                      className="btn btn-error btn-sm ml-2 text-white"
                    >
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

          <div className="mt-4 flex justify-center">
            <button
              className="btn btn-outline mr-2"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn ${
                  currentPage === pageNumber + 1 ? "btn-active" : "btn-outline"
                } mx-1`}
                onClick={() => setCurrentPage(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            ))}
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
      )}
    </div>
  );
};

export default AdminServiceProviderManagement;
