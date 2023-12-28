import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import phone from "../../assets/icons/telephone.png";
import NumberVerificatonModal from "../NumberVerificationModal/NumberVerificationModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { DeviceContext, ThemeContext } from "../../App";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const { googleSignIn, setLoading, signIn, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { device } = useContext(DeviceContext);
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  console.log(device);

  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Set the desired scroll position when the component is mounted
    if (device.isSmallDevice || device.isMediumDevice) {
      window.scrollTo({
        top: 574,
        behavior: "smooth",
      });
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  const handleChangeModalState = () => {
    setShowModal(!showModal);
  };

  const handleGooleSignIn = () => {
    googleSignIn()
      .then((result) => {
        navigate(from, { replace: true });
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        setLoading(false);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, {
          hideProgressBar: true,
          theme: "colored",
        });
        setLoading(false);
        // The email of the user's account used.
        // The AuthCredential type that was used.

        // ...
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user.emailVerified) {
          navigate(from, { replace: true });
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setError("The email or password you entered is incorrect.");
          setLoading(false);
          return;
        }
        console.log(error.message);
        console.error(`Error: ${error}`);
        toast.error(error.message, {
          hideProgressBar: true,
          theme: "colored",
        });
        setLoading(false);
      });
  };

  return (
    <div className="max-w-[400px] mx-auto my-12 px-5">
      <h2 className="text-4xl font-semibold text-center mb-6">Log in</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control flex flex-row items-center my-5">
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="input input-bordered input-md w-full font-semibold h-11"
            required
          />
        </div>
        <div className="form-control flex flex-row items-center mt-5">
          <input
            name="password"
            type="password"
            placeholder="password"
            className="input input-bordered input-md w-full font-semibold h-11"
            required
          />
        </div>
        <Link
          className="text-blue-600 font-semibold text-sm block my-7 mt-1 text-center hover:underline"
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
        <button className="text-white btn bg-[#FF6600] hover:bg-[#1D2736] px-10 py-3 font-semibold w-full rounded-lg">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-md"></span>
              Logging in...
            </>
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
       <p className="font-semibold mt-3 text-xs text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-semibold text-sm"
          >
            Sign Up
          </Link>
        </p>
      <div className="divider font-semibold">OR</div>
      <button
        onClick={handleChangeModalState}
        className="bg-[#409899] font-medium hover:bg-[#409899] btn px-10 py-2 text-white text-lg w-full rounded-lg my-3 flex justify-center items-center gap-3"
      >
        <span>
          <img className="w-5" src={phone} alt="" />
        </span>
        Mobile Number
      </button>
      <button
        onClick={handleGooleSignIn}
        className="bg-[#DF4930] font-medium hover:bg-[#DF4930] btn px-10 py-2 text-white text-lg w-full rounded-lg mb-3 flex justify-center items-center gap-3"
      >
        <span>
          <img src={google} alt="" />
        </span>
        Continue with Google
      </button>
      <button className="bg-[#507CC0] hover:bg-[#507CC0] font-medium btn px-10 py-2 text-white text-lg w-full rounded-lg flex justify-center items-center gap-3">
        <span>
          <img src={facebook} alt="" />
        </span>
        Continue with Facebook
      </button>
      {showModal && (
        <NumberVerificatonModal
          handleChangeModalState={handleChangeModalState}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Login;
