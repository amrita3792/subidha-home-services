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
  const [formData, setFormData] = useState({
    userName: user.displayName,
  });
  const [isUpdateName, setIsUpdateName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);

  console.log(formData);

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

  useEffect(() => {
    fetch("https://bdapis.com/api/v1.1/divisions")
      .then((res) => res.json())
      .then((data) => {
        const divisions = data.data;
        setDivisions(divisions);
      });
  }, []);

  useEffect(() => {
    if (formData.division) {
      fetch(`https://bdapis.com/api/v1.1/division/${formData.division}`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.data);
        });
    }
  }, [formData.division]);

  const {
    data: userData = {},
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(),
  });

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:5000/users/${user?.uid}`, {
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  if (error) {
    toast.error("There was an error fetching user data.", {
      hideProgressBar: true,
      autoClose: false,
      theme: "colored",
    });
    return;
  }

  if (isLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

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

  const handleSubmit = async (e) => {
    setLoading(true);
    setUpdateProfileName(true);
    e.preventDefault();
    formData.uid = user.uid;
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.acknowledged) {
        updateUserProfile(
          formData.userName === user.displayName
            ? formData.userName
            : formData.userName,
          user?.photoURL
        )
          .then(() => {
            refetch();
            toast.success("User Updated successfully!", {
              hideProgressBar: true,
              theme: "colored",
            });
            setLoading(false);
            setUpdateProfileName(false);
          })
          .catch((error) => {
            setUpdateProfileName(false);
            setLoading(false);
            toast.error(error.message, {
              hideProgressBar: true,
              theme: "colored",
            });
          });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChangeName = (e) => {
    inputName.current = e.target.value;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleChangeDistrict = (e) => {
    const districtInfo = districts.filter(
      (district) => district.district === e.target.value
    );
    setUpazillas(districtInfo[0].upazilla);
  };

  return (
    <div className="md:p-5">
      <h2 className="text-xl font-semibold text-center mb-5">My Profile</h2>
      <div className="relative flex flex-col justify-center items-center gap-10 md:p-14 lg:p-0 w-full  mx-auto">
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
        {loading && (
          <span className="loading loading-bars loading-md hidden md:block"></span>
        )}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold block mb-1 " htmlFor="name">
                Name
              </label>
              <input
                ref={inputName}
                onChange={(e) => {
                  handleChange(e);
                  handleChangeName(e);
                }}
                type="text"
                placeholder="Name"
                className="input input-bordered input-md w-full font-semibold focus:outline-none"
                name="userName"
                required
                defaultValue={userData.userName}
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 " htmlFor="email">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="input input-bordered input-md w-full font-semibold focus:outline-none"
                name="email"
                defaultValue={userData.email ? userData.email : ""}
                disabled={user.email}
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 " htmlFor="phone">
                Phone
              </label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="phone"
                className="input input-bordered input-md w-full font-semibold focus:outline-none"
                name="phone"
                defaultValue={userData.phone ? userData.phone : ""}
                disabled={user.phoneNumber}
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 " htmlFor="signupDate">
                Sign-up Date
              </label>
              <input
                type="text"
                className="input input-bordered input-md w-full font-semibold focus:outline-none"
                name="signupDate"
                defaultValue={userData.signupDate}
                disabled
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 " htmlFor="lastLogin">
                Last Login Date
              </label>
              <input
                type="text"
                className="input input-bordered input-md w-full font-semibold focus:outline-none"
                name="lastLogin"
                defaultValue={userData.lastLogin}
                disabled
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 " htmlFor="division">
                Division
              </label>
              <select
                required
                onChange={handleChange}
                defaultValue={userData.division}
                className="select select-bordered w-full focus:outline-none font-semibold"
                name="division"
              >
                <option defaultValue="">
                  {userData.division
                    ? `Current Division: ${userData.division}`
                    : "---------------Select Your Division---------------"}
                </option>
                {divisions.map((division) => (
                  <option
                    className="font-semibold"
                    defaultValue={division.division}
                    key={division.division}
                  >
                    {division.division}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 " htmlFor="district">
                District
              </label>
              <select
                required
                disabled={!formData.division} // Disable if formData.division is falsy
                onChange={(e) => {
                  handleChange(e);
                  handleChangeDistrict(e);
                }}
                defaultValue={userData.district}
                className="font-semibold border select select-bordered w-full focus:outline-none"
                name="district"
              >
               <option defaultValue="" >
                  {userData.district
                    ? `Current Upazila: ${userData.district}`
                    : "---------------Select Your Upazila---------------"}
                </option>
                {districts.map((district) => (
                  <option
                    className="font-semibold"
                    defaultValue={district.district}
                    key={district._id}
                  >
                    {district.district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 " htmlFor="upazila">
                Upazila
              </label>
              <select
                required
                disabled={!formData.district} // Disable if formData.district is falsy
                onChange={(e) => {
                  handleChange(e);
                }}
                defaultValue={userData.upazila}
                className="font-semibold border select select-bordered w-full focus:outline-none"
                name="upazila"
              >
                <option defaultValue="">
                  {userData.upazila
                    ? `Current Upazila: ${userData.upazila}`
                    : "---------------Select Your Upazila---------------"}
                </option>
                {upazillas.map((upazilla) => (
                  <option
                    className="font-semibold"
                    defaultValue={upazilla}
                    key={upazilla}
                  >
                    {upazilla}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-active btn-neutral mt-5 bg-[#FF6600] hover:bg-[#1D2736] border-none px-10 text-white">
            {loading ? (
              <>
                {" "}
                <span className="loading loading-spinner loading-md md:hidden"></span>{" "}
                Updating
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
