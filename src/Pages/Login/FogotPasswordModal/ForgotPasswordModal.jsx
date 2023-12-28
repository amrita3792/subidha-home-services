import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ setResetPassword }) => {
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    console.log(email);
    setError(null);
    resetPassword(email)
      .then(() => {
        setResetPassword(false);
        toast.success(
          "A password reset link has been sent to the email address associated with your account. Please check your inbox and follow the instructions to reset your password",
          {
            hideProgressBar: true,
            theme: "colored",
          }
        );
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message);
        setLoading(false);
        // ..
      });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Reset your password</h3>
        <p className="py-4">
          To reset your password, enter the email address you use to log in.
        </p>
        <form onSubmit={handleResetPassword} method="dialog">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered input-md input-info w-full py-2"
            required
          />
          <button className="btn btn-active bg-[#FF6600] hover:bg-[#1D2736] text-white mt-5">
           {loading && <span className="loading loading-spinner loading-md"></span>}Get
            reset link
          </button>
        </form>
        {error && (
          <div
            role="alert"
            className="alert text-red-500 text-sm font-bold p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <button
          onClick={() => setResetPassword(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </div>
    </dialog>
  );
};

export default ForgotPasswordModal;
