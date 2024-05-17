import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({ isModalOpen, setIsModalOpen, reviewService }) => {
  const { user } = useContext(AuthContext);
  const [selectedFileURL, setSelectedFileURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [rating, setRating] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { serviceManUID, service, servicePhotoURL } = reviewService;

  const isFileValid = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const extension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFileChange = (e, setImageFunction, setImageURL) => {
    const file = e.target.files[0];
    setIsImageLoading(true);

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

  const handleRatingChange = (e) => {
    const ratingValue = e;
    setRating(ratingValue);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const date = new Date();
    const isoDateString = date.toISOString();

    const review = {
      rating,
      selectedFileURL,
      comment: form.comment.value,
      date: isoDateString,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userUID: user.uid,
      serviceManUID,
      service,
      servicePhotoURL,
    };

    fetch("https://subidha-home-services-server3792.glitch.me/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setLoading(false);
          setIsModalOpen(!isModalOpen);
          navigate(`/provider-profile/${serviceManUID}`);
        }
      });
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="review-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg text-center">SUBIDHA</h3>
          <div className="py-4 flex items-center gap-3">
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img src={user.photoURL} />
              </div>
            </div>
            <div>
              <p className="text-black font-semibold leading-none">
                {user.displayName}
              </p>
              <p className="flex items-center gap-1">
                <small>Posting Publicly</small>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="">
            <form onSubmit={handleSubmit} className="grow">
              <div className="my-3 mb-6 flex justify-center">
                <div className="rating rating-md">
                  <input
                    onChange={() => handleRatingChange(1)}
                    type="radio"
                    name="rating-7"
                    className="mask mask-star-2 bg-orange-400"
                    value="1"
                  />
                  <input
                    onChange={() => handleRatingChange(2)}
                    type="radio"
                    name="rating-7"
                    className="mask mask-star-2 bg-orange-400"
                    value="2"
                  />
                  <input
                    onChange={() => handleRatingChange(3)}
                    type="radio"
                    name="rating-7"
                    className="mask mask-star-2 bg-orange-400"
                    value="3"
                  />
                  <input
                    onChange={() => handleRatingChange(4)}
                    type="radio"
                    name="rating-7"
                    className="mask mask-star-2 bg-orange-400"
                    value="4"
                  />
                  <input
                    onChange={() => handleRatingChange(5)}
                    type="radio"
                    name="rating-7"
                    className="mask mask-star-2 bg-orange-400"
                    value="5"
                  />
                </div>
              </div>
              <textarea
                name="comment"
                className="textarea textarea-primary w-full focus:outline-none"
                placeholder="Your feedback matters! Share your experience with our home services."
                required
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
                        className="w-6 h-6 text-indigo-500"
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
                        Upload file
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

              <div className="flex justify-end">
                <button className="btn bg-[#FF6600] hover:bg-[#1D2736] rounded-none text-white px-7 active:scale-95">
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}{" "}
                  POST
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
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
        </div>
      </dialog>
    </div>
  );
};

export default ReviewModal;
