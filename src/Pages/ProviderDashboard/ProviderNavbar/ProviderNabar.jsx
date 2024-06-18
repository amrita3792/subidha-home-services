import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChatContext, ThemeContext } from "../../../App";
import io from "socket.io-client";

import SearchModal from "../../../Components/SearchModal/SearchModal";
import UserAccessLinks from "../../Shared/UserAccessLinks/UserAccessLinks";
import ChatWindow from "../../Shared/ChatWindow/ChatWindow";
import ChatPopup from "../../Shared/ChatPopup/ChatPopup";
// import logo from "../../../assets/logo/subidha-logo.png";

const ProviderNavbar = ({ isMounted }) => {
  const { user } = useContext(AuthContext);
  // const { theme, handleToggle } = useContext(ThemeContext);
  const { theme, handleToggle } = useContext(ThemeContext);
  const { receiver, setReceiver } = useContext(ChatContext);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatPopup, setOpenChatPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [totalUnseenMessage, setTotalUnseenMessage] = useState(0);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  function beep() {
    var snd = new Audio(
      "https://dl.sndup.net/rsb9/announcement-sound-4-21464.mp3"
    );
    snd.play();
  }

  const handleSidebarState = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (!user || !receiver) return;
    const newSocket = io("https://subidha-home-services-server3792.glitch.me/");

    setMessages([]);
    setLoadingMessage(true);
    setTotalUnseenMessage(0);
    newSocket.emit("joinRoom", { uid1: user?.uid, uid2: receiver?.uid });

    newSocket.on("roomJoined", ({ success, roomId }) => {
      if (success) {
        setRoomId(roomId);
      } else {
        // Handle the case where the room is full or other errors
        console.error("Failed to join room");
      }
    });

    setSocket(newSocket);

    return () => {
      // Disconnect the socket on component unmount
      newSocket.disconnect();
    };
  }, [user, receiver, roomId, receiver?.uid]);

  useEffect(() => {
    if (roomId) {
      fetch(
        `https://subidha-home-services-server3792.glitch.me/chats/${roomId}`
      )
        .then((res) => res.json())
        .then((data) => {
          const previousMessages = data.messages.map((message, idx) => (
            <div
              key={idx}
              className={
                message.senderId === user?.uid
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      message.senderId === user?.uid
                        ? user?.photoURL
                          ? user.photoURL
                          : "https://i.ibb.co/M1qvZxP/user.png"
                        : receiver.photoURL
                        ? receiver.photoURL
                        : "https://i.ibb.co/M1qvZxP/user.png"
                    }
                  />
                </div>
              </div>
              <div
                className={`chat-bubble overflow-hidden ${
                  message.senderId === user.uid
                    ? "bg-[#345DA7] text-white"
                    : "bg-gray-200 text-black"
                } `}
              >
                {message.message}
              </div>
            </div>
          ));
          setMessages(previousMessages);
          setLoadingMessage(false);
        })
        .catch((error) => {});
    }
  }, [roomId]);

  useEffect(() => {
    if (socket && user) {
      // Listen for private messages
      socket.on(`privateMessage-${user.uid}`, ({ senderId, message }) => {
        setTotalUnseenMessage((prev) => prev + 1);
        beep();
        setMessages((prevMessages) => [
          ...prevMessages,
          <div key={prevMessages.length} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    receiver?.photoURL
                      ? receiver?.photoURL
                      : "https://i.ibb.co/M1qvZxP/user.png"
                  }
                />
              </div>
            </div>
            <div className="chat-bubble overflow-hidden bg-gray-200 text-black">
              {message}
            </div>
          </div>,
        ]);
      });

      socket.on(`myMessage-${user.uid}`, ({ senderId, message }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          <div key={prevMessages.length} className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/M1qvZxP/user.png"
                  }
                />
              </div>
            </div>
            <div className="chat-bubble overflow-hidden bg-[#345DA7] text-white">
              {message}
            </div>
          </div>,
        ]);
      });
    }
  }, [socket, user]);

  useEffect(() => {
    if (receiver) {
      setOpenChatWindow(true);
    }
  }, [receiver]);

  useEffect(() => {
    if (openChatWindow && totalUnseenMessage > 0) {
      setTotalUnseenMessage(0);
    }
  }, [openChatWindow]);

  const handleNewUserMessage = (newMessage) => {
    if (socket && receiver.uid && newMessage) {
      socket.emit("privateMessage", {
        roomId,
        senderId: user.uid,
        receiverId: receiver.uid,
        message: newMessage,
      });
    }
  };

  return (
    <nav className="bg-white h-[80px] relative w-full px-11 shadow-lg">
      <div className="flex items-center md:justify-between justify-end h-full">
        <div className="hidden lg:flex items-center">
          <span className="">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            className={`py-2 text-sm rounded-md pl-4 focus:outline-none bg-inherit`}
            placeholder="Type to Search..."
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className="flex items-center gap-8">
          {user?.uid && (
            <div className="relative">
              <button
                className="lg:tooltip"
                data-tip="Messages"
                onClick={() => setOpenChatPopup(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </button>
              {openChatPopup && (
                <ChatPopup
                  receiver={receiver}
                  setReceiver={setReceiver}
                  setOpenChatPopup={setOpenChatPopup}
                />
              )}
            </div>
          )}
          {user?.uid ? (
            user?.photoURL ? (
              <div className="flex items-center gap-4 font-semibold">
                <p>
                  {user.displayName} <br />{" "}
                  <span className="text-sm">Provider</span>
                </p>
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="relative tooltip"
                  data-tip="Account"
                >
                  <img
                    className="w-16 h-16 rounded-full cursor-pointer lg:tooltip"
                    data-tip="Account"
                    src={user.photoURL}
                    alt=""
                  />
                  {isOpen && (
                    <UserAccessLinks isOpen={isOpen} setIsOpen={setIsOpen} />
                  )}
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative"
              >
                <div className="text-white flex items-center gap-3">
                  <img
                    className="w-10 h-10 cursor-pointer lg:tooltip"
                    data-tip="Account"
                    src="https://i.ibb.co/M1qvZxP/user.png"
                    alt="user-logo"
                  />
                </div>
                {isOpen && (
                  <UserAccessLinks isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </div>
            )
          ) : (
            <button>
              <Link
                to="/login"
                className="btn text-sm bg-inherit hover:bg-inherit text-white border-2 border-white"
              >
                Log In
              </Link>
            </button>
          )}
          {openSidebar ? (
            <button className="lg:hidden">
              <X size={32} color="white" />
            </button>
          ) : (
            <button className="lg:hidden" onClick={handleSidebarState}>
              <List size={32} color="white" />
            </button>
          )}
        </div>
      </div>
      {openSidebar && (
        <div
          onClick={handleSidebarState}
          className="fixed z-[29999] top-0 left-0 w-full min-h-[3000px] bg-black opacity-60 lg:hidden"
        ></div>
      )}
      {receiver?.uid && user?.uid && (
        <div className="fixed bottom-6 right-6 z-[20000]">
          <button
            onClick={() => setOpenChatWindow((prev) => !prev)}
            className="flex items-center justify-center rcc-launcher bg-[#FF6600] hover:bg-[#FF6600] btn-circle h-[60px] w-[60px] text-white"
          >
            {openChatWindow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 rotate-90 transition-all duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8  transition-all duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            )}
            {!openChatWindow && totalUnseenMessage > 0 && (
              <span className="w-6 h-6 bg-red-600 flex justify-center items-center text-sm rounded-full absolute -right-1 -top-2 shadow-lg">
                {totalUnseenMessage}
              </span>
            )}
          </button>
          {openChatWindow && (
            <ChatWindow
              loadingMessage={loadingMessage}
              socket={socket}
              receiver={receiver}
              messages={messages}
              roomId={roomId}
              handleNewUserMessage={handleNewUserMessage}
              setOpenChatWindow={setOpenChatWindow}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default ProviderNavbar;
