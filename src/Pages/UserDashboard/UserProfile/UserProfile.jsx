import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "keep-react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../App";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const {
    user,
    updateUserProfile,
    setUpdateProfilePicture,
    setUpdateProfileName,
    updateUserEmail,
  } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const fileInputRef = useRef(null);
  const imageHostKey = import.meta.env.VITE_IMGBB_KEY;
  const inputName = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUpdateName, setIsUpdateName] = useState(false);
  const [loading, setLoading] = useState(false);

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
              fetch(`http://localhost:5000/users/${user.uid}`, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ photo: photoURL }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.acknowledged) {
                    setUpdateProfilePicture(true);
                    setLoading(false);
                    toast.success("Your profile picture has been updated! ", {
                      hideProgressBar: true,
                    });
                    setSelectedImage(null);
                    refetch();
                  }
                });
            })
            .catch((error) => {
              toast.error(error.message, {
                hideProgressBar: true,
                theme: "colored",
              });
              setLoading(false);
              setUpdateProfilePicture(false);
            });
        });
    }
  }, [selectedImage]);

  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(`http://localhost:5000/users/${user?.uid}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

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
    if (inputName.current) {
      setLoading(true);
      updateUserProfile(inputName.current, user?.photoURL)
        .then(() => {
          fetch(`http://localhost:5000/users/${user.uid}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ userName: inputName.current }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                setUpdateProfileName(true);
                setIsUpdateName(false);
                setLoading(false);
                refetch();
                toast.success("Name updated successfully", {
                  hideProgressBar: true,
                });
              }
            });
        })
        .catch((error) => {
          setUpdateProfilePicture(false);
          setLoading(false);
          toast.error(error.message, {
            hideProgressBar: true,
            theme: "colored",
          });
        });
    }
  };

  const handleChangeName = (e) => {
    inputName.current = e.target.value;
  };

  return (
    <div className="md:p-5">
      <div
        className={`relative flex flex-col justify-center items-center gap-10 md:p-14 lg:p-0  w-full lg:w-4/5  mx-auto ${
          theme === "light" && "text-stone-600"
        }`}
      >
        <h2 className="text-3xl font-semibold">Welcome Back!</h2>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        {userData?.photo ? (
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full"
              src={userData?.photo}
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
          <div className="relative">
            <img
              className="w-24 h-24"
              src="https://i.ibb.co/M1qvZxP/user.png"
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
        )}
        {loading && <span className="loading loading-bars loading-md"></span>}

        <table className="overflow-x-scroll  text-left">
          <tbody>
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Name
              </th>
              <td className="px-6 py-4 font-semibold text-sm flex flex-col items-start gap-2">
                {isUpdateName ? (
                  <input
                    onChange={handleChangeName}
                    className="w-full input input-bordered input-sm focus:outline-none max-w-xs"
                    type="text"
                    name="name"
                    id=""
                    defaultValue={userData?.userName}
                    autoFocus
                  />
                ) : userData?.userName ? (
                  userData?.userName
                ) : (
                  "N/A"
                )}
                <span className="md:hidden">
                  {isUpdateName ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleUpdateUserName}
                        className="text-blue-500 font-semibold hover:underline text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setIsUpdateName(false)}
                        className="text-red-600 font-semibold hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsUpdateName(true);
                      }}
                      className="text-blue-500 font-semibold hover:underline text-sm"
                    >
                      Edit
                    </button>
                  )}
                </span>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                {isUpdateName ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleUpdateUserName}
                      className="text-blue-500 font-semibold hover:underline text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setIsUpdateName(false)}
                      className="text-red-600 font-semibold hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsUpdateName(true);
                    }}
                    className="text-blue-500 font-semibold hover:underline text-sm"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>

            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Phone
              </th>
              <td className="px-6 py-4 font-semibold text-sm">
                {userData?.phone ? userData.phone : "N/A"}
              </td>
            </tr>

            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Email
              </th>
              <td className="px-6 py-4 text-sm font-semibold">
                {userData?.email ? userData?.email : "N/A"}
              </td>
            </tr>

            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Sign-up Date
              </th>
              <td className="px-6 py-4 text-sm font-semibold">
                {userData?.signupDate}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                Last Login Date
              </th>
              <td className="px-6 py-4 text-sm font-semibold">
                {userData?.lastLogin}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
