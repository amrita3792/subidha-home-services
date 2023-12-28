import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import phone from "../../assets/icons/telephone.png";
import NumberVerificatonModal from "../NumberVerificationModal/NumberVerificationModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { DeviceContext, ThemeContext } from "../../App";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const { googleSignIn, setLoading } = useContext(AuthContext);
  const {device} = useContext(DeviceContext);


  console.log(device);

  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Set the desired scroll position when the component is mounted
    if(device.isSmallDevice || device.isMediumDevice) {
      window.scrollTo({
        top: 574,
        behavior: 'smooth',
      });
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  const handleChangeModalState = () => {
    setShowModal(!showModal);
  };

  const handleGooleSignIn = () => {
    googleSignIn()
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      const user = result.user;
      setLoading(false);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage, {
        hideProgressBar: true,
        theme: "colored"
      })
      setLoading(false);
      // The email of the user's account used.
      // The AuthCredential type that was used.
    
      // ...
    });
  };

  return (
    <div className="max-w-[400px] mx-auto my-12 px-5">
      <h2 className="text-4xl font-semibold text-center mb-6">Log in</h2>
      <form>
        <div className="form-control flex flex-row items-center my-5">
          <span className="bg-[#FF6600] p-3 rounded-l-[8px]">
            <EnvelopeIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${
              theme === "light"
                ? styles.emailField
                : "border-2 border-l-0 border-gray-400 rounded-r-xl"
            }`}
            type="email"
            name=""
            id="#id-10"
            placeholder="Email"
          />
        </div>
        <div className="form-control flex flex-row items-center mt-5">
          <span className="bg-[#FF6600] p-3 rounded-l-[8px]">
            <LockClosedIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${
              theme === "light"
                ? styles.passwordField
                : "border-2 border-l-0 border-gray-400 rounded-r-xl"
            }`}
            type="password"
            name=""
            id="#id-11"
            placeholder="Password"
          />
        </div>
        <Link
          className="text-blue-600 font-semibold text-sm block my-7 mt-1 text-center hover:underline"
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
        <button className="text-white btn bg-[#FF6600] hover:bg-[#1D2736] px-10 py-3 font-semibold w-full rounded-lg">
          LOG IN
        </button>
        <p className="font-semibold mt-3 text-xs text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-semibold text-sm"
          >
            Sign Up
          </Link>
        </p>
      </form>
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
      <button onClick={handleGooleSignIn} className="bg-[#DF4930] font-medium hover:bg-[#DF4930] btn px-10 py-2 text-white text-lg w-full rounded-lg mb-3 flex justify-center items-center gap-3">
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
