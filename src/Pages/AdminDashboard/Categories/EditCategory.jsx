import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { serviceName, icon, _id, isFeatured } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEditCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const file = form.photo.files[0];

    // console.log(form.gender);

    const formData = new FormData();
    formData.append("key", import.meta.env.VITE_IMGBB_KEY); // Replace with your ImageBB API key
    formData.append("image", file);

    let response;

    if (file) {
      response = await axios.post("https://api.imgbb.com/1/upload", formData);
    }

    const category = {
      _id,
      serviceName: form.serviceName.value,
      isFeatured: form.isFeatured.value,
    };

    if(response?.data?.data?.url) {
        category.icon = response.data.data.url;
    }

    fetch(`https://subidha-home-services-server3792.glitch.me/edit-categories/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        toast.success(`${serviceName} category updated successfully`, {
          
          theme: "colored",
        });
        navigate("/admin-dashboard/categories");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message, {
          
          theme: "colored",
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleEditCategory} className="max-w-screen-md mx-auto">
        <h2 className="text-2xl font-semibold mt-8 mb-5">Edit Category</h2>
        <div className="form-control">
          <p className="font-semibold mb-2 text-sm">
            Category Name <span className="text-red-500">*</span>
          </p>
          <input
            required
            defaultValue={serviceName}
            type="text"
            name="serviceName"
            placeholder="Category name..."
            className="input input-bordered input-info w-full"
          />
        </div>
        <div className="form-control mt-7">
          <p className="font-semibold mb-2 text-sm">Category Image</p>
          <input
            name="photo"
            type="file"
            className="file-input file-input-bordered file-input-info w-full "
          />
        </div>
        <div className="form-control mt-7">
          <img className="w-20 h-20" src={icon} alt="" />
        </div>
        <div className="form-control mt-6 w-fit">
          <p className="mb-2 font-semibold">
            Is Featured? <span className="text-red-500">*</span>
          </p>
          <label className="label cursor-pointer justify-start gap-4 w-fit">
            <input
              required
              defaultValue="yes"
              type="radio"
              name="isFeatured"
              className="radio checked:bg-blue-500"
              defaultChecked={isFeatured === "yes"}

            />
            <span className="label-text">Yes</span>
          </label>
        </div>
        <div className="form-control w-fit">
          <label className="label cursor-pointer justify-start gap-4 w-fit">
            <input
              required
              defaultValue="no"
              type="radio"
              name="isFeatured"
              className="radio checked:bg-blue-500"
              defaultChecked={isFeatured === "no"}
            />
            <span className="label-text">No</span>
          </label>
        </div>
        <div className="form-control flex flex-row justify-end gap-3">
          <button
            onClick={() => navigate("/admin-dashboard/categories")}
            className="btn btn-error text-white"
          >
            Cancel
          </button>
          <button className="btn btn-info text-white">
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
