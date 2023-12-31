import { useQuery } from "@tanstack/react-query";
import React from "react";

const ChatPopup = ({ setOpenChatPopup, setReceiver }) => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:5000/users`).then((res) => res.json()),
  });

  if (isLoading) {
    return;
  }

  return (
    <div className="relative z-[45000] text-black">
      <div className="p-2 bg-white fixed md:absolute top-0 left-0 md:left-auto md:top-2 md:-right-28 lg:right-0 z-[50000] md:rounded-xl md:shadow-2xl">
        <div className="flex items-center justify-between px-4 my-3">
          <h2 className="text-2xl font-semibold">Chats</h2>
          <button
            onClick={() => setOpenChatPopup(false)}
            className="btn btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto w-screen h-screen md:h-[60vh] md:w-[400px] my-5">
          <table className="table mb-5">
            <tbody>
              {users?.users.map((user) => (
                <tr
                  onClick={(e) => {
                    setReceiver(user);
                    setOpenChatPopup(false);
                    e.stopPropagation();
                  }}
                  key={user?.uid}
                  className="card flex-row items-center gap-3  hover:bg-gray-200 cursor-pointer"
                >
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
                        <div className="text-sm font-bold opacity-50">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
      <div
        onClick={() => setOpenChatPopup(false)}
        className="fixed top-0 left-0 w-screen min-h-screen"
      ></div>
    </div>
  );
};

export default ChatPopup;
