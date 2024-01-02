import React from "react";
import { useLoaderData } from "react-router-dom";

const users = () => {
  const users = useLoaderData();
  console.log(users);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-base">
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Signup Date</th>
              <th>Last Login</th>
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
                      <div className="font-bold">Amrita Dey</div>
                      <small className="font-bold">{user.uid}</small>
                    </div>
                  </div>
                </td>
                <td>{user.email ? user.email : "N/A"}</td>
                <td>{user.phone ? user.phone : "N/A"}</td>
                <td>{user.signupDate}</td>
                <td>{user.lastLogin}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default users;
