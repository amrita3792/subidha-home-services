import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { CheckIcon, PencilIcon, UserIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "keep-react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../App";

const MyHub = () => {
  const {
    user,
    updateUserProfile,
    setUpdateProfilePicture,
    setUpdateProfileName,
    loading,
    setLoading,
    updateUserEmail,
  } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const fileInputRef = useRef(null);
  const imageHostKey = import.meta.env.VITE_IMGBB_KEY;
  const inputName = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUpdateName, setIsUpdateName] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);
      const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const photoURL = data.data.url;
          console.log(photoURL);
          updateUserProfile(user?.displayName, photoURL)
            .then(() => {
              setUpdateProfilePicture(true);
              setLoading(false);
              toast.success("Your profile picture has been updated! ", {
                icon: <CheckIcon className="w-5 h-5 text-white" />,
                theme: "colored"
              });
              setSelectedImage(null);
            })
            .catch((error) => {
              toast.error(error.message, {
                hideProgressBar: true,
                theme: "colored"
              })
              setLoading(false);
              setUpdateProfilePicture(false);
            });
        });
    }
  }, [selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      console.log(file);
    }
  };

  const handleButtonClick = () => {
    setUpdateProfilePicture(false);
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };

  const handleUpdateUserName = () => {
    updateUserProfile(inputName.current, user?.photoURL)
      .then(() => {
        setUpdateProfileName(true);
        setIsUpdateName(false);
        setLoading(false);
        toast.success("Name updated successfully", {
          icon: <CheckIcon className="w-5 h-5 text-white" />,
          hideProgressBar: true,
          theme: "colored"
        });
      })
      .catch((error) => {
        setUpdateProfilePicture(false);
        setLoading(false);
        toast.error(error.message, {
          hideProgressBar: true,
          theme: "colored"
        })
      });
  };

  const handleChangeName = (e) => {
    inputName.current = e.target.value;
  };

  return (
    <div className="p-5">
      <div className="relative overflow-x-auto flex flex-col justify-center items-center gap-10 md:p-14 lg:p-0 md:max-w-screen-sm lg:w-3/6 mx-auto">
        <h2 className="text-5xl">WELCOME BACK!</h2>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        {user?.photoURL ? (
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full"
              src={user?.photoURL}
              alt=""
            />
            <Tooltip
              content="Change Profile Picture"
              trigger="hover"
              placement="bottom"
              animation="duration-300"
              style="dark"
            >
              <button
                onClick={handleButtonClick}
                className="absolute p-2 border border-gray-300 rounded-full bg-white right-0 bottom-1"
              >
                <PencilIcon className="w-5 h-5 text-stone-600" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white p-8 rounded-full relative">
            <UserIcon className="w-16 h-16" />
            {/* Edit User Profile Picture */}
            <Tooltip
              content="Change Profile Picture"
              trigger="hover"
              placement="bottom"
              animation="duration-300"
              style="dark"
            >
              <button
                onClick={handleButtonClick}
                className="absolute p-2 border border-gray-300 rounded-full bg-white right-0 bottom-1"
              >
                <PencilIcon className="w-5 h-5 text-stone-600" />
              </button>
            </Tooltip>
          </div>
        )}
        {loading && <span className="loading loading-bars loading-md"></span>}

        <table className="w-full  text-left  text-gray-500">
          <tbody>
            <tr className={`border-b ${theme === "light" ? "dark:border-gray-300" : "dark:border-gray-600"}`}>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Name
              </th>
              <td className="px-6 py-4">
                {isUpdateName ? (
                  <input
                    onChange={handleChangeName}
                    className="w-full"
                    type="text"
                    name="name"
                    id=""
                    defaultValue={user?.displayName}
                    autoFocus
                  />
                ) : user?.displayName ? (
                  user.displayName
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-6 py-4">
                {isUpdateName ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleUpdateUserName}
                      className="text-emerald-500 font-semibold hover:underline text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setIsUpdateName(false)}
                      className="text-pink-600 font-semibold hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsUpdateName(true);
                    }}
                    className="text-emerald-500 font-semibold hover:underline text-sm"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
            <tr className={`border-b ${theme === "light" ? "dark:border-gray-300" : "dark:border-gray-600"}`}>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Phone
              </th>
              <td className="px-6 py-4">{user?.phoneNumber ? user.phoneNumber: "N/A"}</td>
            </tr>
            <tr className={`border-b ${theme === "light" ? "dark:border-gray-300" : "dark:border-gray-600"}`}>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Email
              </th>
              <td className="px-6 py-4">{user?.email ? user.email : "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHub;
