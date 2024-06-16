import { useContext, useEffect, useState } from "react";
import img from "../../../../assets/images/Setting Research (1).gif";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../contexts/AuthProvider";

const users = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const { user: loginUser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://subidha-home-services-server3792.glitch.me/users?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setCount(data.count);
      });
  }, [page, size]);

  const pages = Math.ceil(count / size);

  const roles = ["Admin", "Sub admin", "Super admin"];

  const handleOnChnage = (e) => {
    const searchText = e.target.value;
    fetch(`https://subidha-home-services-server3792.glitch.me/users?searchText=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  };

  const handleUpdateUser = (e, user) => {
    fetch(
      `https://subidha-home-services-server3792.glitch.me/users/admin/${user.uid}?userId=${loginUser.uid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ role: e.target.value }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(
            `Successfully assigned ${e.target.value} role to ${user.userName}!`,
            {
              
              theme: "colored",
            }
          );
        } else {
          toast.error(data.message, {
            
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          
          theme: "colored",
        });
      });
  };

  return (
    <div className="p-4 bg-white shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb- p-5">
        <h2 className="text-2xl font-semibold mb-5">All Users</h2>
        <input
          onChange={handleOnChnage}
          type="search"
          placeholder="Search..."
          className="input input-bordered focus:border-none input-info w-full max-w-xs h-10 font-semibold"
        />
      </div>
      <div className="overflow-auto">
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
              <th>Change Role</th>
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
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.userName ? user.userName : "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email ? user.email : "N/A"}</td>
                <td>{user.phone ? user.phone : "N/A"}</td>
                <td>{user.signupDate}</td>
                <td>{user.lastLogin}</td>
                <td>{user?.status}</td>
                <td>{user.role ? user.role : "Member"}</td>
                <td className="relative z-50">
                  <select
                    defaultValue={user?.role}
                    onChange={(e) => handleUpdateUser(e, user)}
                    className="select select-ghost w-full font-semibold focus:border-none focus:outline-none"
                  >
                    <option>
                      Change user role
                    </option>
                    {roles.map((role, idx) => (
                      <option defaultValue={role} key={idx}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users?.length && (
          <div className="flex justify-center items-center">
            <div>
              <img className="w-52" src={img} alt="" />
              <h2 className="text-center text-2xl font-semibold">
                Sorry! No results found
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-end gap-5 mt-10">
        <div className="flex items-center gap-3">
          <select
            onChange={(event) => {
              setSize(event.target.value);
              setPage(0);
            }}
            defaultValue={size} // Use the state variable to control the selected option
            className="select select-bordered w-fit focus:border-none"
          >
            <option defaultValue="15">15</option>
            <option defaultValue="30">30</option>
            <option defaultValue="45">45</option>
            <option defaultValue="60">60</option>
            <option defaultValue="75">75</option>
            <option defaultValue="90">90</option>
            <option defaultValue="105">105</option>
          </select>

          <p className="font-semibold text-sm">Items per page</p>
        </div>
        <div className="join">
          {page > 0 && (
            <button onClick={() => setPage(page - 1)} className="join-item btn">
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
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
              Previous page
            </button>
          )}
          {[...Array(pages).keys()].map((number, idx) => {
            return (
              <input
                onClick={() => setPage(number)}
                key={number}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={number + 1}
                defaultChecked={page === idx}
              />
            );
          })}
          {(page + 1) * size < count && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="join-item btn"
            >
              Next
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
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default users;
