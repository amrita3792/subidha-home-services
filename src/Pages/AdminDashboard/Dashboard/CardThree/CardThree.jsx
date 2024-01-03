import React, { useContext } from "react";
import { ThemeContext } from "../../../../App";

const CardThree = () => {
    const {theme} = useContext(ThemeContext);
  return (
    <div className={`card ${theme === "light" ? "bg-white" : "bg-[#24303F] border-slate-700"} shadow-md mt-9 border rounded-lg`}>
      <div className="card-body">
        <div className={`flex h-11 w-11 rounded-full items-center justify-center ${theme === "light" ? "bg-[#EFF2F7]" : "bg-[#313D4A]"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="card-title text-3xl">15K</h2>
          <span className="font-semibold text-indigo-400 text-sm">Users</span>
        </div>
      </div>
    </div>
  );
};

export default CardThree;
