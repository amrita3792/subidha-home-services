import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";

const AddStaffModal = ({ handleChangeModalState }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const file = form.photo.files[0];

    // console.log(form.gender);

    const formData = new FormData();
    formData.append("key", import.meta.env.VITE_IMGBB_KEY); // Replace with your ImageBB API key
    formData.append("image", file);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );

    const staff = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      photo: response.data.data.url,
      dateOfBirth: form.dateOfBirth.value,
      gender: form.gender.value,
      providerId: user.uid,
    };

    // console.log(staff);

    fetch("https://subidha-home-services-server3792.glitch.me/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staff),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setLoading(false);
          handleChangeModalState();
          toast.success(
            "A new Staff added successfully",
            {
              hideProgressBar: true,
              // theme: "colored",
            }
          );
        }
      }).catch(error => {
        setLoading(false);
        handleChangeModalState();
        toast.error(
            error.message,
            {
              hideProgressBar: true,
              // theme: "colored",
            }
          );
      }) 
  };

  return (
    <div>
      <dialog id="add-staff" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Basic Information</h3>
          <button
            onClick={handleChangeModalState}
            className="btn btn-circle absolute right-4 top-4"
          >
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

          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <p className="mb-2 font-semibold">
                Name <span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="name"
                type="text"
                placeholder="Enter your name..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Phone <span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="phone"
                type="text"
                placeholder="Enter your phone..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Email <span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="email"
                type="email"
                placeholder="Enter your email..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Photo <span className="text-red-500">*</span>
              </p>
              <input
                name="photo"
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Date of Birth<span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="dateOfBirth"
                type="date"
                placeholder="Enter your date of birth..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="form-control mt-6 w-fit">
              <p className="mb-2 font-semibold">
                Gender <span className="text-red-500">*</span>
              </p>
              <label className="label cursor-pointer justify-start gap-4 w-fit">
                <input
                  defaultValue="male"
                  type="radio"
                  name="gender"
                  className="radio checked:bg-blue-500"
                  checked
                />
                <span className="label-text">Male</span>
              </label>
            </div>

            <div className="form-control w-fit">
              <label className="label cursor-pointer justify-start gap-4 w-fit">
                <input
                  defaultValue="female"
                  type="radio"
                  name="gender"
                  className="radio checked:bg-blue-500"
                />
                <span className="label-text">Female</span>
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <button className="btn btn-neutral rounded-none bg-red-500 border-none">
                Cancel
              </button>
              <button className="btn btn-neutral rounded-none">{loading && <span className="loading loading-spinner loading-md"></span>}Submit</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddStaffModal;
