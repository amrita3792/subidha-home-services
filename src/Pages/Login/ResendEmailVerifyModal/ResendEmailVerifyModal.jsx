import React from "react";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

const ResendEmailVerifyModal = ({ email, currentUser, setVerifyEmail }) => {

  const handleResendEmail = () => {
    sendEmailVerification(currentUser).then(() => {
      setVerifyEmail(false);
      toast.success("A verification link has been sent to your email account", {
        hideProgressBar: true,
        theme: "colored",
      });
    });
  };
  
  return (
    <dialog id="resend_email" className="modal">
      <div className="modal-box">
        <button onClick={() => setVerifyEmail(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-2xl">Please verify your email</h3>
        <p className="font-semibold text-sm mt-3">
          To complete your registration process, you have to verify your email
          address <span className="text-blue-500">{email}</span>
        </p>
        <div role="alert" className="alert relative bg-gray-200 mt-3">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-sem">
            Not to worry, we can send the link again!
          </span>
          <div>
            <button
              onClick={handleResendEmail}
              className="btn btn-sm btn-outline"
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ResendEmailVerifyModal;
