import { useContext, useState } from "react";
import AddStaffModal from "../../../Components/AddStaffModal/AddStaffModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Staffs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const {
    data: staffs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: () =>
      fetch(`
https://subidha-home-services-server3792.glitch.me/staff/${user.uid}`).then(
        (res) => res.json()
      ),
  });

  if (isError) {
    toast.error(error.message, {
      hideProgressBar: true,
      // theme: "colored",
    });
  }

  console.log(staffs);

  if (isLoading) {
    return (
      <div className="absolute w-full top-0 left-0 h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  const handleChangeModalState = async () => {
    await setModalOpen((prev) => !prev);
    await document.getElementById("add-staff")?.showModal();
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              Staffs
            </li>
          </ul>
        </div>
      </div>
      <h3 className="font-semibold text-2xl text-center">My Staffs</h3>
      <div className="flex justify-end my-8">
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {staffs?.map((staff) => (
              <tr key={staff._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={staff.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
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

                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <AddStaffModal handleChangeModalState={handleChangeModalState} />
      )}
    </div>
  );
};

export default Staffs;
