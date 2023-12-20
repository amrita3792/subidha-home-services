import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import { PencilIcon, UserIcon } from "@heroicons/react/24/solid";

const MyHub = () => {
  const { user } = useContext(AuthContext);

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      console.log("Selected Image:", selectedImage);
      setSelectedImage(null);
    }
  }, [selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div className="p-5">
      <Breadcrumbs
        links={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "My Profile",
            path: "/profile/my-hub",
          },
        ]}
      />
      <div className="relative overflow-x-auto flex flex-col justify-center items-center gap-10 w-2/5 mx-auto">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        {user?.photoURL ? (
          <img className="w-24 h-24 rounded-full" src={user?.photoURL} alt="" />
        ) : (
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white p-8 rounded-full relative">
            <UserIcon className="w-16 h-16" />
            {/* Edit User Profile Picture */}
            <button
              onClick={handleButtonClick}
              className="absolute p-2 border border-gray-300 rounded-full bg-white right-0 bottom-1"
            >
              <PencilIcon className="w-5 h-5 text-stone-600" />
            </button>
          </div>
        )}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHub;
