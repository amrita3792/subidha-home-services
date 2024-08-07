import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NumberVerificatonModal from "../NumberVerificationModal/NumberVerificationModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { ModalContext } from "../../App";
import { toast } from "react-toastify";
import ForgotPasswordModal from "./FogotPasswordModal/ForgotPasswordModal";
import ResendEmailVerifyModal from "./ResendEmailVerifyModal/ResendEmailVerifyModal";
import { getDate, getTime } from "../../utilities/date";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { googleSignIn, signIn } = useContext(AuthContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [error, setError] = useState(null);
  const [resetPassword, setResetPassword] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [uid, setUid] = useState("");
  const [token] = useToken(uid);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  useEffect(() => {
    if (verifyEmail) {
      document.getElementById("resend_email").showModal();
    }
  }, [verifyEmail]);

  const handleChangeModalState = () => setShowModal(!showModal);

  const handleGoogleSignIn = async () => {
    // setLoading(true);
    try {
      const result = await googleSignIn();
      const user = result.user;
      const { createdAt, lastLoginAt, lastSignInTime, creationTime } =
        user.metadata;
      const creationDate = getDate(creationTime);
      const lastSignInDate = getDate(lastSignInTime);
      const formattedLastSignInWithTime = `${lastSignInDate} | ${getTime(
        lastLoginAt
      )}`;
      const formattedCreationTimeWithTime = `${creationDate} | ${getTime(
        createdAt
      )}`;

      const currentUser = {
        uid: user.uid,
        userName: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL || "https://i.ibb.co/M1qvZxP/user.png",
        signupDate: formattedCreationTimeWithTime,
        lastLogin: formattedLastSignInWithTime,
        status: user.emailVerified || user.phoneNumber ? "Active" : "Pending",
     
      };

      const response = await fetch(
        "https://subidha-home-services-server3792.glitch.me/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      );

      const data = await response.json();
      if (data.acknowledged) {
        setUid(currentUser.uid);
      }
    } catch (error) {
      toast.error(error.message, { hideProgressBar: true, theme: "colored" });
    } finally {
      // setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { email, password } = e.target.elements;

    try {
      const userCredential = await signIn(email.value, password.value);
      const user = userCredential.user;

      if (user.emailVerified) {
        const response = await fetch(
          `https://subidha-home-services-server3792.glitch.me/update-status/${user.uid}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "active" }),
          }
        );

        const data = await response.json();
        if (data.acknowledged) {
          setUid(user.uid);
        }
      } else {
        setVerifyEmail(true);
        setCurrentUser(user);
        setEmail(user.email);
      }
    } catch (error) {
      setError(
        error.message === "Firebase: Error (auth/invalid-credential)."
          ? "The email or password you entered is incorrect."
          : `Error: ${error.message}`
      );
      toast.error(error.message, { hideProgressBar: true, theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-12 px-3">
      <h2 className="text-3xl font-semibold text-center mb-6">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control flex flex-row items-center my-5">
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="input input-bordered input-md w-full font-semibold h-11 focus:outline-none"
            required
          />
        </div>
        <div className="form-control flex flex-row items-center mt-5">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered input-md w-full font-semibold h-11 focus:outline-none"
            required
          />
        </div>
        <Link
          to="#"
          onClick={async () => {
            await setResetPassword(true);
            document.getElementById("my_modal_3").showModal();
          }}
          className="text-[#FF6600] font-semibold text-sm block my-7 mt-1 text-center hover
"
        >
          Forgot your password?
        </Link>
        <button
          className="text-white btn bg-[#FF6600] hover:bg-[#1D2736] px-10 py-3 w-full rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner text-error"></span>
          ) : (
            "Log In"
          )}
        </button>
      </form>
      {error && (
        <div role="alert" className="alert text-red-500 text-sm font-bold p-2">
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
      <p className="font-semibold mt-3 text-sm text-center">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-[#FF6600] hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>
      <div className="divider font-semibold">OR</div>
      <button
        onClick={handleChangeModalState}
        type="button"
        className="text-white bg-[#24292F] btn hover:bg-[#24292F]/90 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-full"
      >
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
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
        Phone Number
      </button>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 btn font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fillRule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clipRule="evenodd"
          />
        </svg>
        Sign in with Google
      </button>
      <button
        type="button"
        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 btn focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center  items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2 w-full flex justify-center"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 8 19"
        >
          <path
            fillRule="evenodd"
            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
            clipRule="evenodd"
          />
        </svg>
        Sign in with Facebook
      </button>
      {showModal && (
        <NumberVerificatonModal
          handleChangeModalState={handleChangeModalState}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {resetPassword && (
        <ForgotPasswordModal setResetPassword={setResetPassword} />
      )}
      {verifyEmail && (
        <ResendEmailVerifyModal
          currentUser={currentUser}
          email={email}
          setVerifyEmail={setVerifyEmail}
        />
      )}
    </div>
  );
};

export default Login;
