import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyHub = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
     
      <div className="relative overflow-x-auto flex flex-col justify-center items-center gap-10 w-2/5 mx-auto">
      <img className="w-28 h-28 rounded-full" src={user?.photoURL} alt="" />
        <table className="w-full  text-left  text-gray-500">
          <tbody>
            <tr className="bg-white border-b  dark:border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Name
              </th>
              <td className="px-6 py-4">Amrita Dey</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Phone
              </th>
              <td className="px-6 py-4">+8801311929644</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Email
              </th>
              <td className="px-6 py-4">N/A</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Date of birth
              </th>
              <td className="px-6 py-4">N/A</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Gender
              </th>
              <td className="px-6 py-4">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHub;
