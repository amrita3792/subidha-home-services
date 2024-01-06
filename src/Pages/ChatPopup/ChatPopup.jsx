import { useQuery } from "@tanstack/react-query";
import React from "react";

const ChatPopup = ({ setOpenChatPopup, setReceiver }) => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:5000/users`).then((res) => res.json()),
  });

  console.log(users);

  if (isLoading) {
    return;
  }

  return (
    <div className="relative z-[45000] text-black">
      <div className="h-screen w-screen md:h-[600px] p-5 pr-0  md:w-96 bg-white fixed md:absolute top-0 left-0 md:left-auto md:top-2 md:-right-28 lg:right-0 z-[50000] md:rounded-xl md:shadow-2xl">
        <div className="h-full overflow-auto">
          <h2 className="text-2xl font-semibold">Chats</h2>
          
          <div className="card flex-row items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer">
            <figure>
              <img
                className="h-[56px] w-[56px] rounded-full"
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div>
              <h2 className="text-base font-semibold">Amrita Dey</h2>
              <p className="text-sm">How are you?</p>
            </div>
          </div>
          {users?.users.map((user) => (
            <div
              onClick={(e) => {
                setReceiver(user);
                setOpenChatPopup(false);
                e.stopPropagation();
              }}
              key={user?.uid}
              className="card flex-row items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
            >
              <figure>
                <img
                  className="h-[56px] w-[56px] rounded-full"
                  src={user.photo}
                  alt="Shoes"
                />
              </figure>
              <div>
                <h2 className="text-base font-semibold">Amrita Dey</h2>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setOpenChatPopup(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </div>
      <div
        onClick={() => setOpenChatPopup(false)}
        className="fixed top-0 left-0 w-screen min-h-screen"
      ></div>
    </div>
  );
};

export default ChatPopup;
