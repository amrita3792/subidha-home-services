import React, { useState } from "react";
import send from "../../../assets/icons/send.png";
// import InputEmoji from 'react-input-emoji'

const ChatWindow = ({ setOpenChatWindow, handleNewUserMessage, messages, receiver }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    handleNewUserMessage(message);
    form.reset();
  }

  return (
    <div
      onClick={(e) => {
        setOpenChatWindow(true);
        e.stopPropagation();
      }}
      className="absolute bg-white h-[600px] w-96 bottom-[70px] right-0 rounded-xl shadow-xl text-black
      "
    >
      <div className="bg-[#FF6600] h-24 rounded-t-xl flex items-center gap-4 p-4">
        <img className="h-14 w-14 rounded-full" src={receiver.photo} alt="" />
        <div>
            <h2 className="text-white text-lg font-semibold">{receiver.userName}</h2>
        </div>
      </div>
      <div className="h-[450px] overflow-auto p-5">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble text-white">
            What kind of nonsense is this
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble chat-bubble-primary bg-[#FF6600] text-white">
            What kind of nonsense is this
          </div>
        </div>
        {messages}
      </div>
        <form onSubmit={handleSubmit} className="flex items-center absolute bottom-0 p-5 w-full">
          <input
            autoFocus
            className="focus:outline-none grow px-2"
            type="text"
            name="message"
            placeholder="Type a message..."
          />
          <button onClick={() => handleNewUserMessage(text)}>
            <img src={send} alt="" />
          </button>
        </form>
      </div>
  );
};

export default ChatWindow;
