import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ChevronDoubleDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../../../App";
import UserAccessLinks from "../UserAccessLinks/UserAccessLinks";
import ChatPopup from "../../ChatPopup/ChatPopup";
import io from "socket.io-client";
import ChatWindow from "../ChatWindow/ChatWindow";

const Navbar = ({ isMounted }) => {
  const { user } = useContext(AuthContext);
  const { theme, handleToggle } = useContext(ThemeContext);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatPopup, setOpenChatPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [totalUnseenMessage, setTotalUnseenMessage] = useState(0);

  function beep() {
    var snd = new Audio(
      "https://dl.sndup.net/rsb9/announcement-sound-4-21464.mp3"
    );
    snd.play();
  }

  console.log("Hello")

  const handleSidebarState = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io("http://localhost:5000");

    // Join the room based on user UID
    if (user && receiver) {
      setMessages([]);
      setTotalUnseenMessage(0);
      newSocket.emit("joinRoom", { uid1: user?.uid, uid2: receiver?.uid });
    }

    newSocket.on("roomJoined", ({ success, roomId }) => {
      if (success) {
        setRoomId(roomId);
      } else {
        // Handle the case where the room is full or other errors
        console.error("Failed to join room");
      }
    });

    // newSocket.on('previousMessages', (previousMessages) => {
    //   // Update UI to display previous messages
    //   setMessages(previousMessages);
    // });

    setSocket(newSocket);

    return () => {
      // Disconnect the socket on component unmount
      newSocket.disconnect();
    };
  }, [user, receiver]);

  useEffect(() => {
    if (roomId)
      [
        fetch(`http://localhost:5000/chats/${roomId}`)
          .then((res) => res.json())
          .then((data) => {
            const previousMessages = data.messages.map((message, idx) => (
              <div
                key={idx}
                className={
                  message.senderId === user.uid
                    ? "chat chat-end"
                    : "chat chat-start"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div
                  className={`chat-bubble overflow-hidden ${
                    message.senderId === user.uid && "bg-[#FF6600]"
                  } text-white`}
                >
                  {message.message}
                </div>
              </div>
            ));
            setMessages(previousMessages);
          }),
      ];
  }, [roomId, user]);

  useEffect(() => {
    if (socket && user) {
      // Listen for private messages
      socket.on(`privateMessage-${user.uid}`, ({ senderId, message }) => {
        setTotalUnseenMessage((prev) => prev + 1);

        setMessages((prevMessages) => [
          ...prevMessages,
          <div key={prevMessages.length} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-bubble overflow-hidden text-white">
              {message}
            </div>
          </div>,
        ]);
      });

      socket.on(`myMessage-${user.uid}`, ({ senderId, message }) => {
        console.log(message);
        setMessages((prevMessages) => [
          ...prevMessages,
          <div key={prevMessages.length} className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-bubble overflow-hidden bg-[#FF6600] text-white">
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

  const navLinks = [
    {
      idx: 0,
      path: "/",
      name: "Home",
    },
    {
      idx: 1,
      path: "/all-services",
      name: "All Services",
    },
    {
      idx: 2,
      path: "/blog",
      name: "Blog",
    },
  ];

  return (
    <nav className="bg-[#1d2736] h-16 relative">
      <div className="xl:max-w-screen-xl mx-auto flex items-center justify-end lg:justify-between h-full px-5">
        <ul
          className={`flex flex-col pt-20 lg:flex-row lg:items-center gap-4 lg:gap-7 fixed z-[30000] lg:z-auto lg:static  top-0 ${
            openSidebar ? "right-0" : "right-[-1000px]"
          } ${
            theme === "light" ? "bg-white" : "bg-[#1D232A]"
          } lg:bg-inherit w-4/5 md:w-1/2 lg:w-auto h-screen lg lg:h-auto p-10 lg:p-0 z-50 transition-all lg:transition-none duration-500 ease-in-out`}
        >
          <li
            onClick={handleSidebarState}
            className="flex items-center gap-1 font-medium text-sm cursor-pointer lg:hidden absolute top-3 left-3"
          >
            <button className="btn btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </button>{" "}
          </li>
          {navLinks.map((navLink) => (
            <li key={navLink.idx}>
              <Link
                onClick={handleSidebarState}
                className="text-sm lg:text-white font-semibold"
                to={navLink.path}
              >
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          {isMounted && (
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden cursor-pointer text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </label>
          )}
          <button className="text-blac cursor-pointer text-white">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                onChange={handleToggle}
                type="checkbox"
                checked={theme === "light" ? false : true}
              />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </button>
          <button className="text-white">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          {user?.uid && (
            <div className="text-white relative">
              <button onClick={() => setOpenChatPopup(true)}>
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
                  setReceiver={setReceiver}
                  setOpenChatPopup={setOpenChatPopup}
                />
              )}
            </div>
          )}
          {user?.uid ? (
            user?.photoURL ? (
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative"
              >
                <img
                  className="w-10 h-10 rounded-full  cursor-pointer"
                  src={user.photoURL}
                  alt=""
                />
                {isOpen && (
                  <UserAccessLinks isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative"
              >
                <div className="text-white flex items-center gap-3">
                  <UserIcon className="h-6 w-6" />
                  <p className="flex items-center">
                    <span className="text-sm font-semibold">Profile</span>
                    <ChevronDoubleDownIcon className="h-6 w-6" />
                  </p>
                </div>
                {isOpen && (
                  <UserAccessLinks isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </button>
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
              receiver={receiver}
              messages={messages}
              handleNewUserMessage={handleNewUserMessage}
              setOpenChatWindow={setOpenChatWindow}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
