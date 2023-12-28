import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
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
import { DeviceContext, ThemeContext } from "../../App";
import { toast } from "react-toastify";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import newMessage from '../../assets/images/new-messages.png'

const Signup = () => {
  const { googleSignIn, setLoading, loading, createUser, logout } =
    useContext(AuthContext);
  const { device } = useContext(DeviceContext);
  const { theme } = useContext(ThemeContext);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [isReceive, setIsReceive] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Set the desired scroll position when the component is mounted
    if (device.isSmallDevice || device.isMediumDevice) {
      window.scrollTo({
        top: 574,
        behavior: "smooth",
      });
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  const [showModal, setShowModal] = useState(false);
  let from = location.state?.from?.pathname || "/";

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

  const handleSubmit = (e) => {
    setError(null);
    e.preventDefault();
    const form = e.target;
    if (!emailError && !passwordError) {
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      createUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          form.reset();
          updateName(user, name);
          console.log(user);
          setIsReceive(false);
          emailVerify(user);
          setEmail(user.email);
          logout();
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
          setLoading(false);
          console.log(`Error: ${errorMessage}`);
        });
    }
  };

  const emailVerify = (currentUser) => {
    sendEmailVerification(currentUser).then(() => {
      setIsReceive(true);
    });
  };

  const updateName = (currentUser, name) => {
    updateProfile(currentUser, {
      displayName: name,
    })
      .then()
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handleOnBlur = (e) => {
    const value = e.target.value;
    if (e.target.name === "email") {
      setEmailError(null);
      if (value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        return;
      }
      setEmailError(
        "Invalid email address. Please enter a valid email address."
      );
    } else if (e.target.name === "password") {
      setPasswordError(null);
      if (
        value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\[\]^_`|~])[A-Za-z\d!@#$%^&*()-_=+{};:'",.<>?/\\[\]^_`|~]{6,}$/
        )
      ) {
        return;
      }
      setPasswordError(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    } else {
      console.log();
    }
  };

  return isReceive ? (
    <div className="max-w-[400px] mx-auto flex flex-col items-center text-center my-16">
      <img className="" src={newMessage} alt="" />
      <h2 className="text-3xl font-semibold mt-12 mb-5">Verify Your Email</h2>
      <p className="text-lg font-semibold my-2">
        Thank you for signing up! To complete your registration, we've sent a verification link to your email address <span className="text-blue-500">({email})</span>.
      </p>
      <p className="text-sm text-[#ff6347] font-semibold">
        Please check your inbox and click on the verification link to activate your account. If you don't see the email in your inbox, please check your spam folder.
      </p>
      <p className="text-blue-500 font-semibold underline my-3"><Link to="/login">Go to login screen</Link></p>
      {/* You can customize the message further based on your application's specific requirements. */}
    </div>
  ) : (
    <div className="max-w-[400px] mx-auto my-12 px-5">
      <h2 className="text-4xl text-center mb-6 font-semibold">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control flex flex-row items-center my-5">
        <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered input-md w-full font-semibold h-11"
            required
          />
        </div>
        <div className="form-control flex flex-row items-center mt-5">
        <input onBlur={handleOnBlur}
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered input-md w-full font-semibold h-11"
            required
          />
        </div>
        {emailError && (
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
            <span>{emailError}</span>
          </div>
        )}
        <div className="form-control flex flex-row items-center mt-5">
        <input onBlur={handleOnBlur}
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered input-md w-full font-semibold h-11"
            required
          />
        </div>
        {passwordError && (
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
            <span>{passwordError}</span>
          </div>
        )}
        <button className="btn text-white bg-[#FF6600] hover:bg-[#1D2736] px-10 py-3 font-semibold w-full rounded-lg mt-8">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-md"></span>
              Sugning Up...
            </>
          ) : (
            "Sign Up"
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
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline text-sm">
          Log In
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

export default Signup;
