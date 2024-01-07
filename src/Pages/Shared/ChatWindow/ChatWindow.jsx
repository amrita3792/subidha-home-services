import React, { useEffect, useRef, useState } from "react";
import send from "../../../assets/icons/send.png";

// import InputEmoji from 'react-input-emoji'

const ChatWindow = ({
  setOpenChatWindow,
  handleNewUserMessage,
  messages,
  receiver,
  roomId
}) => {
  const scrollableElementRef = useRef(null);

  useEffect(() => {
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollTo({
        top: scrollableElementRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    handleNewUserMessage(message);
    form.reset();
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollTo({
        top: scrollableElementRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      onClick={(e) => {
        setOpenChatWindow(true);
        e.stopPropagation();
      }}
      className="absolute bg-white w-[calc(100vw-40px)] md:w-96 bottom-[70px] right-0 rounded-xl shadow-xl text-black
      "
    >
      <div className="bg-[#FF6600] min-h-24 rounded-t-xl flex items-center gap-4 p-4">
        <img className="h-14 w-14 rounded-full" src={receiver.photo} alt="" />
        <div>
          <h2 className="text-white text-lg font-semibold">
            {receiver.userName}
          </h2>
        </div>
      </div>
      <div
        ref={scrollableElementRef}
        className="h-[55vh] box-border overflow-y-scroll p-5"
      >
        {messages}
      </div>
      <div id="bottom"></div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-b-xl p-5 w-full bg-white border-t border-gray-300"
      >
        <input
          autoFocus
          className="focus:outline-none grow px-2"
          type="text"
          name="message"
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button>
          <img src={send} alt="" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
