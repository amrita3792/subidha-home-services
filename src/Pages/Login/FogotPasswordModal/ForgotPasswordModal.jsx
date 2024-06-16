import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
// import { toast } from "react-toastify";
import email from "../../../assets/icons/email.png";

const ForgotPasswordModal = ({ setResetPassword }) => {
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReceive, setIsReceive] = useState(false);

  const handleResetPassword = (e) => {
    setIsReceive(false);
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    setError(null);
    resetPassword(email)
      .then(() => {
        // setResetPassword(false);
        // toast.success(
        //   "A password reset link has been sent to the email address.",
        //   {
        //     
        //     theme: "colored",
        //   }
        // );
        setLoading(false);
        setIsReceive(true);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setError(error.message);
        setLoading(false);
        // ..
      });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        {isReceive ? (
          <div>
            <div>
              <img className="mx-auto w-32" src={email} alt="" />
              <h3 className="text-center text-2xl font-semibold mb-3">
                Please check your email
              </h3>
              <p className="text-xs font-semibold text-center max-w-xs mx-auto">
                We've just dispatched a password reset link to your email
                address. Kindly check your inbox, including spam or junk
                folders, to complete the process.
              </p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-2xl">Reset your password?</h3>
            <p className="py-4 text-sm font-semibold">
              We'll email you a secure link to reset the password for your
              account.
            </p>
            <form onSubmit={handleResetPassword} method="dialog">
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="input input-bordered input-md  font-semibold h-11 w-full max-w-xs focus:outline-none"
                required
              />
              <button className="btn btn-neutral mt-3 flex">
                {loading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                Get reset link
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
          </>
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
