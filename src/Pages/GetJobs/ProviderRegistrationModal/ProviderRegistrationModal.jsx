import React, { useContext, useEffect } from "react";
("use client");
import { useState } from "react";
import { Upload } from "keep-react";
import { ThemeContext } from "../../../App";

const ProviderRegistrationModal = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedNIDCard, setSelectedNIDCard] = useState(null);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [isDraggingNIDCard, setIsDraggingPNIDCard] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [formData, setFormData] = useState({});

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isFileValid = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const extension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  useEffect(() => {
    fetch("https://bdapis.com/api/v1.1/divisions")
      .then((res) => res.json())
      .then((data) => {
        const divisions = data.data;
        console.log(divisions);
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

  const handleDrop = (e, setImageFunction, setDraggingFunction) => {
    console.log(setImageFunction);
    console.log(e);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isFileValid(file)) {
      setImageFunction(file);
      setDraggingFunction(false);
    }
  };

  const handleDragOver = (e, setDraggingFunction) => {
    e.preventDefault();
    setDraggingFunction(true);
  };

  const handleDragLeave = (setDraggingFunction) => {
    setDraggingFunction(false);
  };

  const handleFileChange = (e, setImageFunction) => {
    const file = e.target.files[0];
    if (file && isFileValid(file)) {
      setImageFunction(file);
    }
  };

  const handleChangeDistrict = (e) => {
    const districtInfo = districts.filter(
      (district) => district.district === e.target.value
    );
    setUpazillas(districtInfo[0].upazilla);
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-5xl custom-scrollbar rounded-2xl">
        <button className="btn btn-circle absolute right-4 top-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>
        <h2 className="text-3xl font-semibold mb-16 ">Provider Registration</h2>
        <div className="modal-action block">
          <form className="">
            <h2 className="text-2xl text-center font-semibold mb-10">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-md w-full font-semibold focus:outline-none"
                  name="name"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-md w-full font-semibold focus:outline-none"
                  name="email"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered input-md w-full font-semibold focus:outline-none"
                  name="phone"
                  required
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="font-semibold block mb-1 " htmlFor="name">
                  Photo<span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed p-4 text-center cursor-pointer ${
                    isDraggingPhoto
                      ? "border-[#FF6600]"
                      : `${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`
                  }`}
                  onDrop={(e) =>
                    handleDrop(e, setSelectedFile, setIsDraggingPhoto)
                  }
                  onDragOver={(e) => handleDragOver(e, setIsDraggingPhoto)}
                  onDragLeave={() => handleDragLeave(setIsDraggingPhoto)}
                  onClick={() => document.getElementById("photoInput").click()}
                >
                  {selectedFile ? (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        className="max-w-full max-h-48 mx-auto mb-4"
                      />
                      <p>{selectedFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4 text-slate-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-12 mx-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        <p className="text-xl font-semibold leading-none">
                          Drag and Drop files here <br />
                          <span className="text-base font-normal">
                            Files: JPG, JPEG, PNG
                          </span>
                        </p>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="btn btn-active bg-[#FF6600] hover:bg-[#1D2736] text-white"
                        >
                          Choose File
                        </button>
                        <p>Maximum: 5MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    id="photoInput"
                    onChange={(e) => handleFileChange(e, setSelectedFile)}
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  NID Number<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered input-md w-full font-semibold focus:outline-none"
                  name="nidNumber"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="font-semibold block mb-1 " htmlFor="name">
                  NID Card<span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed p-4 text-center cursor-pointer ${
                    isDraggingNIDCard
                      ? "border-[#FF6600]"
                      : `${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        }`
                  }`}
                  onDrop={(e) =>
                    handleDrop(e, setSelectedNIDCard, setIsDraggingPNIDCard)
                  }
                  onDragOver={(e) => handleDragOver(e, setIsDraggingPNIDCard)}
                  onDragLeave={() => handleDragLeave(setIsDraggingPNIDCard)}
                  onClick={() => document.getElementById("NIDInput").click()}
                >
                  {selectedNIDCard ? (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedNIDCard)}
                        alt="Selected"
                        className="max-w-full max-h-48 mx-auto mb-4"
                      />
                      <p>{selectedNIDCard.name}</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4 text-slate-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-12 mx-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        <p className="text-xl font-semibold leading-none">
                          Drag and Drop files here <br />
                          <span className="text-base font-normal">
                            Files: JPG, JPEG, PNG
                          </span>
                        </p>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="btn btn-active bg-[#FF6600] hover:bg-[#1D2736] text-white"
                        >
                          Choose File
                        </button>
                        <p>Maximum: 5MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    id="NIDInput"
                    onChange={(e) => handleFileChange(e, setSelectedNIDCard)}
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    required
                  />
                </div>
              </div>
            </div>

            <h2 className="text-2xl text-center font-semibold my-10">
              Professional Information
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <input
                type="text"
                placeholder="Business Name"
                className="input input-bordered input-md w-full"
              />
              <input
                type="text"
                placeholder="Registration Number"
                className="input input-bordered input-md w-full"
              />
              <input
                type="number"
                placeholder="Years of Experience"
                className="input input-bordered input-md w-full"
              />
              <input
                type="text"
                placeholder="Certifications or Licenses"
                className="input input-bordered input-md w-full"
              />
            </div>

            {/* <h2 className="text-2xl text-center font-semibold mb-5 mt-10 mb-5 ">
              Service Details
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <input
                type="text"
                placeholder="Business Name"
                className="input input-bordered input-md w-full"
              />
              <input
                type="text"
                placeholder="Registration Number"
                className="input input-bordered input-md w-full"
              />
              <input
                type="number"
                placeholder="Years of Experience"
                className="input input-bordered input-md w-full"
              />
              <input
                type="text"
                placeholder="Certifications or Licenses"
                className="input input-bordered input-md w-full"
              />
            </div> */}

            <h2 className="text-2xl text-center font-semibold mb-5 mt-10 mb-5 ">
              Location Information
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  Division<span className="text-red-500">*</span>
                </label>
                <select
                  required
                  selected
                  onChange={handleChange}
                  defaultValue="---Select Your Divison---"
                  className="select select-bordered w-full focus:outline-none font-semibold"
                  name="division"
                >
                  <option className="font-semibold" value="" disabled selected>
                    ---------------Select Your Divison---------------
                  </option>
                  {divisions.map((division) => (
                    <option className="font-semibold" key={division.division}>
                      {division.division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  District<span className="text-red-500">*</span>
                </label>
                <select
                  disabled={!formData.division ? true : false}
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeDistrict(e);
                  }}
                  defaultValue="---Select Your Divison---"
                  className="font-semibold border select select-bordered w-full focus:outline-none"
                  name="district"
                >
                  <option className="font-semibold" value="" disabled selected>
                    ---------------Select Your District---------------
                  </option>
                  {districts.map((district) => (
                    <option className="font-semibold" key={district._id}>
                      {district.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1 " htmlFor="name">
                  Upazila
                </label>
                <select
                  disabled={!formData.district ? true : false}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  defaultValue="---Select Your Divison---"
                  className="font-semibold border select select-bordered w-full focus:outline-none"
                  name="upazila"
                >
                  <option className="font-semibold" value="" disabled selected>
                    ---------------Select Your Upazila---------------
                  </option>
                  {upazillas?.map((upazilla) => (
                    <option className="font-semibold" key={upazilla}>
                      {upazilla}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ProviderRegistrationModal;
