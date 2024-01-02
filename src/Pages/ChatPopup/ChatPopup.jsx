import React from "react";

const ChatPopup = ({ setOpenChatPopup }) => {
  return (
    <div className="relative z-[45000] text-black">
      <div className="h-screen w-screen md:h-[600px] p-5  md:w-96 bg-white fixed md:absolute top-0 left-0 md:left-auto md:top-2 md:-right-28 lg:right-0 z-[50000] md:rounded-xl md:shadow-2xl">
        <div className="h-full overflow-auto">
          <h2 className="text-2xl font-semibold">Chats</h2>
          <div className="mt-5">
            <div className="card flex-row items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer">
              <figure>
                <img
                  className="h-16 w-16 rounded-full"
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div>
                <h2 className="text-base font-semibold">Amrita Dey</h2>
                <p className="text-sm">How are you?</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setOpenChatPopup(false)}
          className="btn btn-circle bg-inherit border-none absolute top-4 right-4"
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
      <div
        onClick={() => setOpenChatPopup(false)}
        className="fixed top-0 left-0 w-screen min-h-screen"
      ></div>
    </div>
  );
};

export default ChatPopup;
