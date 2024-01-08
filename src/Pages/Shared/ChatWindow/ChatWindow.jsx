import React, { useEffect, useRef, useState } from "react";
import send from "../../../assets/icons/send.png";

// import InputEmoji from 'react-input-emoji'

const ChatWindow = ({
  setOpenChatWindow,
  handleNewUserMessage,
  messages,
  receiver,
  roomId,
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
      className="absolute w-[calc(100vw-40px)] md:w-96 bottom-[70px] right-0 rounded-xl shadow-2xl text-black
      "
    >
      <div className="h-28 bg-[#FF6600] flex items-center gap-4 p-4 relative rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="text-white leading-none">
            <h2 className="text-xl">Amrita Dey</h2>
            <small>
              Hi! I'm Amrita Dey. Facing an issue or have questions?
            </small>
          </div>
        </div>
      </div>
      <div
        ref={scrollableElementRef}
        className="h-[55vh] overflow-y-scroll box-border bg-white p-5"
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
