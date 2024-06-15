import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Categories = () => {
  const navigate = useNavigate();

  const {
    data: allServiceCategories = [],
    isLoading,
    // refetch,
    error,
  } = useQuery({
    queryKey: ["allServices"],
    queryFn: () => fetchServiceCategoriesData(),
  });

  const fetchServiceCategoriesData = async () => {
    const response = await fetch(
      "https://subidha-home-services-server3792.glitch.me/allServiceCategories",
      {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    toast.error("There was an error fetching services data.", {
      hideProgressBar: true,
      autoClose: false,
      // theme: "colored",
    });
    return;
  }

  const handleNavigate = (id) => {
    navigate(`/admin-dashboard/edit-category/${id}`)
  };
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mt-8">Categories</h2>
      <div className="mt-5 flex justify-end">
        <input
          type="search"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs"
        />
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-base">
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Featured</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allServiceCategories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
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
                      <div className="text-sm opacity-50">#{category._id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked
                  />
                </td>
                <td>
                  <button onClick={() => handleNavigate(category._id)} className="btn btn-neutral text-white">
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
    </div>
  );
};

export default Categories;
