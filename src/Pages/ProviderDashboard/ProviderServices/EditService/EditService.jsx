import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const EditService = ({
  editService,
  setEditService,
  service,
  serviceCategory,
  handleChangeModalState,
  setRefetch,
  
}) => {
  const { user } = useContext(AuthContext);
  const [selectedFileURL, setSelectedFileURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { serviceName } = service;



  const isFileValid = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const extension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFileChange = (e, setImageFunction, setImageURL) => {
    const file = e.target.files[0];
    setIsImageLoading(true);
    // console.log(file);
    if (file && isFileValid(file)) {
      setImageFunction(file);
      uploadImage(file, setImageURL);
    }
  };

  const uploadImage = async (file, setImageURL) => {
    try {
      const formData = new FormData();
      formData.append("key", import.meta.env.VITE_IMGBB_KEY); // Replace with your ImageBB API key
      formData.append("image", file);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );

      if (response.data && response.data.data && response.data.data.url) {
        setImageURL(response.data.data.url);
        setIsImageLoading(false);
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleEditService = (e) => {
    
    e.preventDefault();
    const form = e.target;
    const editService = {
      serviceName,
      serviceCategory,
      amount: form.amount.value,
      details: form.details.value,
      selectedFileURL,
    };

    fetch(`http://localhost:5000/edit-provider-service/${user.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editService }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Service Updated Successfully", {
          hideProgressBar: true,
          theme: "colored",
        });
        setRefetch((prev) => !prev);
        form.reset();
        handleChangeModalState();
      })
      .catch((error) => {
        toast.error(error.message, {
          hideProgressBar: true,
          theme: "colored",
        });
        handleChangeModalState();
      });
  };

  return (
    <dialog id="edit_service" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
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
        <h3 className="font-bold text-lg">Edit Service</h3>
        <form onSubmit={handleEditService} className="my-8">
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Service Name..."
              defaultValue={serviceName}
              disabled
              className="input input-bordered input-error w-full"
            />
            <input
              defaultValue={serviceCategory}
              disabled
              type="text"
              placeholder="Service Category..."
              className="input input-bordered input-error w-full"
            />
            <input
              required
              name="amount"
              type="number"
              placeholder="Service Amount..."
              className="input input-bordered input-error w-full"
            />
            <textarea
              name="details"
              className="textarea textarea-error col-span-2 h-56"
              placeholder="Details Information..."
            ></textarea>
            {selectedFileURL ? (
              <div className="rounded-md border bg-gray-50 w-36 mt-2">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="max-w-full max-h-48 mx-auto h-full"
                />
              </div>
            ) : (
              <div className="rounded-md border bg-gray-50 p-4 w-36 mt-2">
                {isImageLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm"></span>
                  </div>
                ) : (
                  <label
                    htmlFor="upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-indigo-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>

                    <span className="text-gray-600 font-semibold text-sm">
                      Upload Image*
                    </span>
                  </label>
                )}
                <input
                  onChange={(e) =>
                    handleFileChange(e, setSelectedFile, setSelectedFileURL)
                  }
                  id="upload"
                  type="file"
                  className="hidden"
                />
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-end">
            <button className="btn bg-[#345DA7] text-white">Submit</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditService;
