import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import img from "../../../../assets/images/Setting Research (1).gif";

const users = () => {
  const [users, setUsers] = useState(useLoaderData());

  console.log(users);

  const roles = ["Admin", "Subadmin", "Super Admin"];

  const handleOnChnage = (e) => {
    const searchText = e.target.value;
    fetch(`http://localhost:5000/users?searchText=${searchText}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl font-semibold mb-5">All Users</h2>
        <input
          onChange={handleOnChnage}
          type="search"
          placeholder="Search..."
          className="input input-bordered focus:border-none input-info w-full max-w-xs h-10"
        />
      </div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-base">
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Signup Date</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.userName ? user.userName : "N/A"}
                      </div>
                      <small className="font-bold">{user.uid}</small>
                    </div>
                  </div>
                </td>
                <td>{user.email ? user.email : "N/A"}</td>
                <td>{user.phone ? user.phone : "N/A"}</td>
                <td>{user.signupDate}</td>
                <td>{user.lastLogin}</td>
                <td>{user?.status}</td>
                <td>{user.role ? user.role : "Member"}</td>
                <td>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 absolute right-0 bg-gray-200"
                    >
                      {roles.map((role, idx) => (
                        <li key={idx}>
                          <a>{role}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users?.length && (
          <div className="flex justify-center items-center">
            <div>
              <img className="w-52" src={img} alt="" />
              <h2 className="text-center text-2xl font-semibold">Sorry! No results found</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default users;
