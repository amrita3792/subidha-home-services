import React, { useContext, useEffect, useRef, useState } from "react";
import send from "../../../assets/icons/send.png";
import { AuthContext } from "../../../contexts/AuthProvider";

const ChatWindow = ({
  setOpenChatWindow,
  handleNewUserMessage,
  messages,
  socket,
  receiver,
  roomId,
  loadingMessage
}) => {
  const scrollableElementRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [isTyping, setIsTyping] = useState(false);

  console.log(messages)


  useEffect(() => {
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollTo({
        top: scrollableElementRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (socket && user) {
      socket.on(`typing-${user.uid}`, ({ senderId }) => {
        setIsTyping(true);
      });
      socket.on(`notTyping-${user.uid}`, ({ senderId }) => {
        setIsTyping(false);
      });
    }
    return () => handleOnBlur();
  }, [socket, user, receiver]);

  useEffect(() => {
    // Event listener for tab/window closing
    window.addEventListener('beforeunload', handleOnBlur);
  
    return () => {
      window.removeEventListener('beforeunload', handleOnBlur);
    };
  }, []);

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

  const handleOnFocus = (e) => {
    if (socket && receiver.uid) {
      socket.emit("typing", {
        roomId,
        senderId: user.uid,
        receiverId: receiver.uid,
      });
    }
  };

  const handleOnBlur = (e) => {
    if (socket && receiver.uid) {
      socket.emit("notTyping", {
        roomId,
        senderId: user.uid,
        receiverId: receiver.uid,
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
              <img src={receiver.photoURL} />
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
        className="h-[55vh] overflow-y-scroll custom-chat-scrollbar box-border bg-white p-5"
      >
        { loadingMessage ? <div className="flex justify-center h-full w-full items-center"><span className="loading loading-spinner loading-md"></span></div> : messages}
        {isTyping && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={receiver.photoURL}
                />
              </div>
            </div>
            <div className="chat-bubble flex bg-gray-200">
              <span className="loading loading-dots loading-sm text-black"></span>
            </div>
          </div>
        )}
      </div>
      <div id="bottom"></div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-b-xl p-5 w-full bg-white border-t border-gray-300"
      >
        <input
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className="focus:outline-none grow px-2 bg-white"
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
