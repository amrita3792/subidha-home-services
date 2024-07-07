import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const AddNewService = () => {
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    icon: null, // Changed to null to indicate no initial file selected
    serviceOverview: [{ title: "", details: [""] }],
    faq: [{ question: "", answer: "" }],
    subCategories: [
      {
        id: "",
        serviceName: "",
        image: null, // Changed to null for initial state
        description: "",
        details: [{ title: "", description: "", details: [""] }],
      },
    ],
  });

  // Fetching service categories data
  const fetchServiceCategoriesData = async () => {
    const response = await fetch(
      "https://subidha-home-services-server3792.glitch.me/serviceCategories"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  const {
    data: allServiceCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service-categories"],
    queryFn: fetchServiceCategoriesData,
  });

  // Loading state while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error handling for data fetching
  if (error) {
    toast.error("There was an error fetching services data.", {
      theme: "colored",
    });
    return null;
  }

  const handleChange = (e, section, index, detailIndex, detailItemIndex) => {
    const { name, value, files } = e.target;
    const updatedFormData = { ...formData };

    if (section) {
      if (section === "serviceOverview") {
        if (detailIndex !== undefined) {
          updatedFormData[section][index].details[detailIndex] = value;
        } else {
          updatedFormData[section][index][name] = value;
        }
      } else if (section === "subCategories") {
        if (name === "id" || name === "serviceName" || name === "description") {
          if (detailIndex !== undefined) {
            if (name === "description") {
              updatedFormData[section][index].details[detailIndex][name] =
                value;
            } else {
              updatedFormData[section][index][name] = value;
            }
          } else {
            updatedFormData[section][index][name] = value;
          }
        } else if (name === "image") {
          updatedFormData[section][index][name] = files[0]; // Assuming single file upload
        } else if (detailIndex !== undefined && detailItemIndex !== undefined) {
          updatedFormData[section][index].details[detailIndex].details[
            detailItemIndex
          ] = value;
        } else if (detailIndex !== undefined) {
          updatedFormData[section][index].details[detailIndex][name] = value;
        }
      } else {
        updatedFormData[section][index][name] = value;
      }
    } else {
      if (name === "icon") {
        updatedFormData[name] = files[0]; // Assuming single file upload
      } else {
        updatedFormData[name] = value;
      }
    }

    setFormData(updatedFormData);
  };

  // Add new field (e.g., detail or FAQ)
  const handleAddField = (section, index, detailIndex) => {
    const updatedFormData = { ...formData };

    if (section === "serviceOverview") {
      updatedFormData[section][index].details.push("");
    } else if (section === "subCategories") {
      updatedFormData[section][index].details.push({
        title: "",
        description: "",
        details: [""],
      });
    } else {
      updatedFormData[section].push({ question: "", answer: "" });
    }

    setFormData(updatedFormData);
  };

  // Remove a field (e.g., detail or FAQ)
  const handleRemoveField = (section, index, detailIndex, detailItemIndex) => {
    const updatedFormData = { ...formData };

    if (section === "serviceOverview" || section === "subCategories") {
      updatedFormData[section][index].details.splice(detailIndex, 1);
    } else {
      updatedFormData[section].splice(index, 1);
    }

    setFormData(updatedFormData);
  };

  // Add a new section (e.g., service overview or subcategory)
  const handleAddSection = (section) => {
    const updatedFormData = { ...formData };

    if (section === "serviceOverview") {
      updatedFormData[section].push({ title: "", details: [""] });
    } else if (section === "subCategories") {
      updatedFormData[section].push({
        id: "",
        serviceName: "",
        image: null, // Changed to null for initial state
        description: "",
        details: [{ title: "", description: "", details: [""] }],
      });
    } else {
      updatedFormData[section].push({ question: "", answer: "" });
    }

    setFormData(updatedFormData);
  };

  // Remove a section (e.g., service overview or subcategory)
  const handleRemoveSection = (section, index) => {
    const updatedFormData = { ...formData };
    updatedFormData[section].splice(index, 1);
    setFormData(updatedFormData);
  };

  // Upload an image file using ImgBB API
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", import.meta.env.VITE_IMGBB_KEY); // Replace with your ImgBB API key

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const updatedFormData = { ...formData };

      // Upload the icon image if it exists
      if (formData.icon) {
        updatedFormData.icon = await handleImageUpload(formData.icon);
      }

      // Upload images for each subcategory
      for (const subCategory of updatedFormData.subCategories) {
        if (subCategory.image) {
          subCategory.image = await handleImageUpload(subCategory.image);
        }
      }

      console.log("Updated Form Data with Image URLs:", updatedFormData);

      // Add your submit logic here (e.g., send data to the server)
    } catch (error) {
      console.error("Error in form submission:", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10  mx-auto shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Add New Service</h2>

      {/* Service Category selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Service Category
        </label>
        {isCreatingNewCategory ? (
          <input
            type="text"
            name="serviceName"
            onChange={(e) => handleChange(e)}
            placeholder="Enter new category name"
            className="input input-bordered w-full"
          />
        ) : (
          <select
            defaultValue={allServiceCategories[1].serviceName}
            name="serviceName"
            onChange={(e) => handleChange(e)}
            className="select select-bordered w-full"
          >
            <option disabled>Select category</option>
            {allServiceCategories.map((category) => (
              <option key={category._id}>{category.serviceName}</option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
          className="btn btn-neutral text-white mt-2"
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
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
            />
          </svg>

          {isCreatingNewCategory
            ? "Select Existing Category"
            : "Create New Category"}
        </button>
      </div>

      {/* Icon selection */}
      {isCreatingNewCategory && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Icon</label>
          <input
            type="file"
            name="icon"
            onChange={(e) => handleChange(e)}
            className="file-input file-input-bordered w-full"
          />
        </div>
      )}

      {/* Service Overview section */}
      {isCreatingNewCategory && (
        <div className="mb-24 mt-16">
          <label className="block text-center font-semibold mb-2 text-xl">
            Service Overview
          </label>
          {formData.serviceOverview.map((overview, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
            >
              <input
                type="text"
                name="title"
                value={overview.title}
                onChange={(e) => handleChange(e, "serviceOverview", index)}
                placeholder="Title"
                className="input input-bordered w-full mb-2"
              />
              {overview.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="mb-2">
                  <div className="flex items-end gap-5">
                    <textarea
                      value={detail}
                      onChange={(e) =>
                        handleChange(e, "serviceOverview", index, detailIndex)
                      }
                      placeholder="Detail"
                      className="textarea textarea-bordered w-full mb-2 h-48 basis-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveField("serviceOverview", index, detailIndex)
                      }
                      className="btn btn-error mt-2 text-white"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAddField("serviceOverview", index)}
                  className="btn btn-info text-white"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSection("serviceOverview", index)}
                className="btn btn-error ml-2 text-white"
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
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleAddSection("serviceOverview")}
              className="btn btn-success text-white"
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
              Add Service Overview
            </button>
          </div>
        </div>
      )}

      {/* FAQ section */}
      {isCreatingNewCategory && (
        <div className="mb-24">
          <label className="block text-center font-semibold mb-2 text-xl">
            FAQ
          </label>
          {formData.faq.map((faqItem, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
            >
              <input
                type="text"
                name="question"
                value={faqItem.question}
                onChange={(e) => handleChange(e, "faq", index)}
                placeholder="Question"
                className="input input-bordered w-full mb-2"
              />
              <textarea
                name="answer"
                value={faqItem.answer}
                onChange={(e) => handleChange(e, "faq", index)}
                placeholder="Answer"
                className="textarea textarea-bordered w-full mb-2 h-44"
              />
              <button
                type="button"
                onClick={() => handleRemoveSection("faq", index)}
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
                Remove FAQ
              </button>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleAddSection("faq")}
              className="btn btn-success text-white"
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
              Add FAQ
            </button>
          </div>
        </div>
      )}

      {/* Sub Categories section */}
      <div className="mb-6">
        <label className="block text-center font-semibold mb-2 text-xl">
          Sub Categories
        </label>
        {formData.subCategories.map((subCategory, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
          >
            <input
              type="text"
              name="id"
              value={subCategory.id}
              onChange={(e) => handleChange(e, "subCategories", index)}
              placeholder="ID"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="serviceName"
              value={subCategory.serviceName}
              onChange={(e) => handleChange(e, "subCategories", index)}
              placeholder="Service Name"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => handleChange(e, "subCategories", index)}
              className="file-input file-input-bordered w-full mb-2"
            />
            <textarea
              name="description"
              value={subCategory.description}
              onChange={(e) => handleChange(e, "subCategories", index)}
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-2 h-44"
            />

            {subCategory.details.map((detail, detailIndex) => (
              <div
                key={detailIndex}
                className="mb-4 p-2 border border-gray-200 rounded bg-white flex basis-full gap-5"
              >
                <div className="basis-full">
                  <input
                    type="text"
                    name="title"
                    value={detail.title}
                    onChange={(e) =>
                      handleChange(e, "subCategories", index, detailIndex)
                    }
                    placeholder="Detail Title"
                    className="input input-bordered w-full mb-2"
                  />
                  <textarea
                    name="description"
                    defaultValue={detail.description}
                    onChange={(e) =>
                      handleChange(e, "subCategories", index, detailIndex)
                    }
                    placeholder="Detail Description"
                    className="textarea textarea-bordered w-full mb-2 h-44"
                  />
                  {detail.details.map((detailItem, detailItemIndex) => (
                    <div key={detailItemIndex} className="mb-2">
                      <textarea
                        onChange={(e) =>
                          handleChange(
                            e,
                            "subCategories",
                            index,
                            detailIndex,
                            detailItemIndex
                          )
                        }
                        placeholder="Detail Item"
                        className="textarea textarea-bordered w-full mb-2 h-44"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  {/* <button
                  type="button"
                  onClick={() =>
                    handleAddField("subCategories", index, detailIndex)
                  }
                  className="btn btn-primary"
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
                  Add Detail Item
                </button> */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveField("subCategories", index, detailIndex)
                    }
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleAddField("subCategories", index)}
                className="btn btn-info text-white"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSection("subCategories", index)}
              className="btn btn-error ml-2 text-white"
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
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => handleAddSection("subCategories")}
            className="btn btn-success text-white"
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
            Add Sub Category
          </button>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-center mt-16">
        <button type="submit" className="btn btn-info text-white w-fit">
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewService;
