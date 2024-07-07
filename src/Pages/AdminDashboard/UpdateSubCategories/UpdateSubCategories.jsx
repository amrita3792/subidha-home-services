import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const data = useLoaderData();
  const navigate = useNavigate();
  const { categoryId, subCategoryId } = useParams();
  console.log(categoryId, subCategoryId);

  // Initialize formData with data.subCategory
  const [formData, setFormData] = useState({
    serviceName: data.subCategory.serviceName,
    image: data.subCategory.image,
    description: data.subCategory.description,
    details: data.subCategory.details || [], // Initialize details if available
  });

  // State for handling image file
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      details: prevData.details.map((detail, i) =>
        i === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      details: [
        ...prevData.details,
        { title: "", description: "" }, // Initialize with empty values
      ],
    }));
  };

  const handleRemoveDetail = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      details: prevData.details.filter((detail, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.serviceName) {
      toast.error("Service name cannot be empty.");
      return false;
    }
    if (!formData.description) {
      toast.error("Description cannot be empty.");
      return false;
    }
    // Additional validation logic as needed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      return;
    }

    // Update formData with imageURL if imageFile exists
    let imageURL = formData.image;
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          formData
        );
        imageURL = response.data.data.url;
      } catch (error) {
        toast.error("Image upload failed.");
        return;
      }
    }

    // Construct updatedData with the new imageURL
    const updatedData = { ...formData, image: imageURL };
    console.log("Updated Data:", updatedData);

    fetch(
      `http://localhost:5000/edit-subcategory/${categoryId}/${subCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedData }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Subcategory updated successfully!");
          setLoading(false);
        } else {
          toast.error("Failed to update subcategory. Please try again later.!");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.success(`${error.message}`);
      });
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Update SubCategory</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-3">
            <span className="text-gray-700">Service Name</span>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              className="input input-bordered w-full input-info"
            />
          </label>
          <label className="block mt-1 mb-3">
            <span className="text-gray-700">Image</span>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-info w-full"
            />
          </label>
          <label className="block mt- mb-3">
            <span className="text-gray-700">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full h-48 textarea-info"
            />
          </label>

          {/* Rendering details array */}
          <h2 className="font-semibold text-xl mb-3 text-center">Details</h2>
          {formData.details.map((detail, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">Title</span>
                <input
                  type="text"
                  name="title"
                  required
                  value={detail.title}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="input input-bordered w-full input-info"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Description</span>
                <textarea
                  required
                  name="description"
                  value={detail.description}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="textarea textarea-bordered w-full h-24 textarea-info"
                />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveDetail(index)}
                className="btn btn-error text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Remove
              </button>
            </div>
          ))}

          {/* Button to add new detail */}
          <button
            type="button"
            onClick={handleAddDetail}
            className="btn btn-success mb-3 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add Detail
          </button>
        </div>

        <div className="form-control flex flex-row justify-end gap-3">
          <button
            onClick={() => navigate("/admin-dashboard/subcategories")}
            className="btn btn-error text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Cancel
          </button>
          <button type="submit" className="btn btn-info text-white">
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSubCategory;
