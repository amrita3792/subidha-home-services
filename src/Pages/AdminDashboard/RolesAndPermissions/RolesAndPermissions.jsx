import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { PencilIcon, TrashIcon } from "@heroicons/react/outline"; // Import HeroIcons

const RolesAndPermissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // State for items per page
  const navigate = useNavigate();

  const {
    data: roles = [],
    isLoading,
    isError,
    error,
    refetch, // Include refetch function for refreshing data
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      fetch("http://localhost:5000/roles").then((res) => res.json()),
  });

  if (isError) {
    toast.error(error.message, {
      theme: "colored",
    });
  }

  if (isLoading) {
    return (
      <div className="absolute w-full top-0 left-0 h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  // Function to handle pagination change
  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle editing a role
  const handleEditRole = (roleId) => {
    console.log(`Editing role with ID: ${roleId}`);
    // Implement edit functionality (e.g., navigate to edit page)
  };

  // Function to handle deleting a role
  const handleDeleteRole = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        // Perform delete operation (example: send delete request to API)
        await fetch(`http://localhost:5000/roles/${roleId}`, {
          method: "DELETE",
        });
        // Refetch roles after deletion
        refetch();
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  // Function to handle changing items per page
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Function to render roles table with edit and delete buttons
  const renderRolesTable = () => {
    // Calculate startIndex and endIndex based on currentPage and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredRoles = roles
      .filter((role) =>
        role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(startIndex, endIndex);

    return (
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Role name</th>
              <th className="px-4 py-2">Permissions</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
              <tr key={role._id}>
                <td className="border px-4 py-2">{role.roleName}</td>
                <td className="border px-4 py-2">
                  {role.permissions.join(", ")}
                </td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditRole(role._id)}
                    className="btn btn-neutral text-white btn-sm btn-outline-primary flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>{" "}
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role._id)}
                    className="btn btn-error text-white btn-sm btn-outline-red flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
    );
  };

  // Function to render pagination buttons
  const renderPaginationButtons = () => {
    const filteredRoles = roles.filter((role) =>
      role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    // Function to handle previous page click
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePrevPage}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePaginationChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  // Function to render items per page selector
  const renderItemsPerPageSelector = () => (
    <div className="mb-4">
      <label className="mr-2">Items per page:</label>
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="border px-2 py-1"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );

  const handleNavigate = () => {
    navigate('/admin-dashboard/add-roles-permissions');
  }

  return (
    <div className="container mx-auto p-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-7">Roles & Permissions</h2>
      <div className="flex justify-end">
        <button onClick={handleNavigate} className="btn btn-active btn-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search roles..."
          className="border px-4 py-2 mr-2 w-1/3"
        />
      </div>
      {roles.length > 0 ? (
        <>
          {renderItemsPerPageSelector()}
          {renderRolesTable()}
          {renderPaginationButtons()}
        </>
      ) : (
        <div>No roles found.</div>
      )}
    </div>
  );
};

export default RolesAndPermissions;
