import { useContext } from "react";
import { ThemeContext } from "../../../../App";

const CardFour = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`card ${
        theme === "light" ? "bg-white" : "bg-[#24303F] border-slate-700"
      } shadow-md mt-9 border rounded-lg`}
    >
      <div className="card-body">
        <div
          className={`flex h-11 w-11 rounded-full items-center justify-center ${
            theme === "light" ? "bg-[#EFF2F7]" : "bg-[#313D4A]"
          }`}
        >
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
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="card-title text-3xl">0 TK</h2>
          <span className="font-semibold text-indigo-400 text-sm">Total Profit</span>
        </div>
      </div>
    </div>
  );
};

export default CardFour;
