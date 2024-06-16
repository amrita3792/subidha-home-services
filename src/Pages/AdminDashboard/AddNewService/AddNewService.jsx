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

  const { data: allServiceCategories = [], isLoading, error } = useQuery({
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

  // Handle form input changes
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
          updatedFormData[section][index][name] = value;
        } else if (name === "image") {
          updatedFormData[section][index][name] = files[0]; // Assuming single file upload
        } else if (detailIndex !== undefined && detailItemIndex !== undefined) {
          updatedFormData[section][index].details[detailIndex].details[detailItemIndex] = value;
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
    <form onSubmit={handleSubmit} className="bg-white p-10  mx-auto shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Service</h2>

      {/* Service Category selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Service Category</label>
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
          className="btn btn-primary mt-2"
        >
          {isCreatingNewCategory ? "Select Existing Category" : "Create New Category"}
        </button>
      </div>

      {/* Icon selection */}
      {
        isCreatingNewCategory && <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Icon</label>
        <input
          type="file"
          name="icon"
          onChange={(e) => handleChange(e)}
          className="file-input file-input-bordered w-full"
        />
      </div>
      }

      {/* Service Overview section */}
      {
        isCreatingNewCategory && <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Service Overview</label>
        {formData.serviceOverview.map((overview, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
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
                <textarea
                  value={detail}
                  onChange={(e) => handleChange(e, "serviceOverview", index, detailIndex)}
                  placeholder="Detail"
                  className="textarea textarea-bordered w-full mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("serviceOverview", index, detailIndex)}
                  className="btn btn-error mt-2 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("serviceOverview", index)}
              className="btn btn-primary"
            >
              Add Detail
            </button>
            <button
              type="button"
              onClick={() => handleRemoveSection("serviceOverview", index)}
              className="btn btn-error ml-2 text-white"
            >
              Remove Overview
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddSection("serviceOverview")}
          className="btn btn-primary"
        >
          Add Service Overview
        </button>
      </div>
      }

      {/* FAQ section */}
      {
        isCreatingNewCategory && <div className="mb-6">
        <label className="block text-sm font-medium mb-2">FAQ</label>
        {formData.faq.map((faqItem, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
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
              className="textarea textarea-bordered w-full mb-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveSection("faq", index)}
              className="btn btn-error text-white"
            >
              Remove FAQ
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddSection("faq")}
          className="btn btn-primary"
        >
          Add FAQ
        </button>
      </div>
      }

      {/* Sub Categories section */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Sub Categories</label>
        {formData.subCategories.map((subCategory, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
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
              className="textarea textarea-bordered w-full mb-2"
            />
            {subCategory.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="mb-4 p-2 border border-gray-200 rounded bg-white">
                <input
                  type="text"
                  name="title"
                  value={detail.title}
                  onChange={(e) => handleChange(e, "subCategories", index, detailIndex)}
                  placeholder="Detail Title"
                  className="input input-bordered w-full mb-2"
                />
                <textarea
                  name="description"
                  value={detail.description}
                  onChange={(e) => handleChange(e, "subCategories", index, detailIndex)}
                  placeholder="Detail Description"
                  className="textarea textarea-bordered w-full mb-2"
                />
                {detail.details.map((detailItem, detailItemIndex) => (
                  <div key={detailItemIndex} className="mb-2">
                    <textarea
                      onChange={(e) => handleChange(e, "subCategories", index, detailIndex, detailItemIndex)}
                      placeholder="Detail Item"
                      className="textarea textarea-bordered w-full mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField("subCategories", index, detailIndex, detailItemIndex)}
                      className="btn btn-error text-white"
                    >
                      Remove Detail Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("subCategories", index, detailIndex)}
                  className="btn btn-primary"
                >
                  Add Detail Item
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("subCategories", index)}
              className="btn btn-primary"
            >
              Add Detail
            </button>
            <button
              type="button"
              onClick={() => handleRemoveSection("subCategories", index)}
              className="btn btn-error ml-2 text-white"
            >
              Remove Sub Category
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddSection("subCategories")}
          className="btn btn-primary"
        >
          Add Sub Category
        </button>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-success w-full text-white">
        Submit
      </button>
    </form>
  );
};

export default AddNewService;
