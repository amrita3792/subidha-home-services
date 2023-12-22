import React, { useContext, useState } from "react";
import styles from "./Signup.module.css";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import phone from "../../assets/icons/telephone.png";
import NumberVerificatonModal from "../NumberVerificationModal/NumberVerificationModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { ThemeContext } from "../../App";
import { toast } from "react-toastify";

const Signup = () => {
  const { googleSignIn, setLoading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="max-w-[400px] mx-auto my-12 px-5">
      <h2 className="text-4xl font-medium text-center mb-6">Sign Up</h2>
      <form>
        <div className="form-control flex flex-row items-center my-5">
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-800 p-3 rounded-l-[8px]">
            <UserIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${
              theme === "light"
                ? styles.nameField
                : "border-2 border-l-0 border-gray-400 rounded-r-xl"
            }`}
            type="text"
            name="name"
            id="#id-9"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-control flex flex-row items-center my-5">
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-800 p-3 rounded-l-[8px]">
            <EnvelopeIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${
              theme === "light"
                ? styles.emailField
                : "border-2 border-l-0 border-gray-400 rounded-r-xl"
            }`}
            type="email"
            name="email"
            id="#id-10"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-control flex flex-row items-center mt-5">
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-800 p-3 rounded-l-[8px]">
            <LockClosedIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${
              theme === "light"
                ? styles.passwordField
                : "border-2 border-l-0 border-gray-400 rounded-r-xl"
            }`}
            type="password"
            name="password"
            id="#id-11"
            placeholder="Password"
            required
          />
        </div>
        <button className="bg-gradient-to-r from-slate-500 to-slate-700 hover:to-slate-500 hover:from-slate-700 px-10 py-3 text-white active:scale-95 font-medium w-full rounded-lg mt-8">
          SIGN UP
        </button>
        <p className="font-medium mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-500 hover:underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </form>
      <div className="divider font-medium">OR</div>
      <button
        onClick={handleChangeModalState}
        className="bg-[#409899] px-10 py-2 text-white text-lg w-full rounded-lg my-3 flex justify-center items-center gap-3"
      >
        <span>
          <img className="w-5" src={phone} alt="" />
        </span>
        Mobile Number
      </button>
      <button onClick={handleGooleSignIn} className="bg-[#DF4930] px-10 py-2 text-white text-lg w-full rounded-lg mb-3 flex justify-center items-center gap-3">
        <span>
          <img src={google} alt="" />
        </span>
        Continue with Google
      </button>
      <button className="bg-[#507CC0] px-10 py-2 text-white text-lg w-full rounded-lg flex justify-center items-center gap-3">
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

export default Signup;
