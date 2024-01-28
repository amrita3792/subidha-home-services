import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { ThemeContext } from "../../../App";
import { AuthContext } from "../../../contexts/AuthProvider";

const ChatPopup = ({ setOpenChatPopup, setReceiver }) => {
  const { theme } = useContext(ThemeContext);
  const {user} = useContext(AuthContext);
  const { data: chatHistroy = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      fetch(`https://subidha-home-services-server2.glitch.me/messages/${user.uid}`).then(
        (res) => res.json()
      ),
  });

  console.log(chatHistroy);

  return (
    <div className={`relative z-[45000] ${theme === "light" && "text-black"}`}>
      <div
        className={`p-2 ${
          theme === "dark" ? "bg-[#1D232A] border border-slate-600" : "bg-white"
        } fixed md:absolute top-0 left-0 md:left-auto md:top-2 md:-right-28 lg:right-0 z-[50000] md:rounded-xl md:shadow-2xl`}
      >
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
          {isLoading && (
            <div className="flex flex-col gap-4">
              {[...Array(5).keys()].map((idx) => (
                <div key={idx} className="flex flex-col gap-4 px-4">
                  <div className="flex gap-4 items-center">
                    <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-4">
                      <div className="skeleton h-4 w-[45%]"></div>
                      <div className="skeleton h-4 w-52"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <table className="table mb-5">
            <tbody>
              {chatHistroy.map((user) => (
                <tr
                  onClick={(e) => {
                    setReceiver(user);
                    setOpenChatPopup(false);
                    e.stopPropagation();
                  }}
                  key={user?.uid}
                  className={`card flex-row items-center gap-3 ${
                    theme === "light"
                      ? "hover:bg-gray-200"
                      : "hover:bg-gray-700"
                  } cursor-pointer border-none`}
                >
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
                        <div className="text-sm font-bold opacity-50">
                          {user.lastMessage}
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
