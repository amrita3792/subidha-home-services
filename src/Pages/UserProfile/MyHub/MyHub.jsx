import React from "react";

const MyHub = () => {
  return (
    <div>
      <div className="relative overflow-x-auto flex justify-center w-2/5 mx-auto">
        <table className="w-full  text-left  text-gray-500">
          <tbody>
            <tr className="bg-white border-b  dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Name
              </th>
              <td className="px-6 py-4">Amrita Dey</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Phone
              </th>
              <td className="px-6 py-4">+8801311929644</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Email
              </th>
              <td className="px-6 py-4">N/A</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
              >
                Date of birth
              </th>
              <td className="px-6 py-4">N/A</td>
            </tr>
            <tr className="bg-white border-b  dark:border-gray-700">
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
