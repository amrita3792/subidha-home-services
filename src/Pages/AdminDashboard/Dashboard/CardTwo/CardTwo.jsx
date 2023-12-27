import React, { useContext } from "react";
import { ThemeContext } from "../../../../App";

const CardTwo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`card ${theme === "light" ? "" : "bg-[#24303F] border-slate-700"} shadow-xl mt-9 border rounded-lg`}>
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
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="card-title text-3xl">500</h2>
          <span className="font-semibold text-indigo-400 text-sm">Providers</span>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
