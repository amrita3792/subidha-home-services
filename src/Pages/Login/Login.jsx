import React, { useState } from "react";
import styles from './Login.module.css';
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import phone from '../../assets/icons/phone.png';
import NumberVerificatonModal from "../NumberVerificationModal/NumberVerificationModal";

const Login = () => {

  const [showModalX, setShowModalX] = useState(false);

  const handleChangeModalState = () => {
    setShowModalX(!showModalX);
  };

  return (
    <div className="max-w-[400px] mx-auto my-12 px-5">
      <h2 className="text-3xl font-medium text-center mb-6">Login</h2>
      <form>
        <div className="form-control flex flex-row items-center my-5">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 p-3">
            <EnvelopeIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${styles.emailField}`}
            type="email"
            name=""
            id="#id-10"
            placeholder="Email"
          />
        </div>
        <div className="form-control flex flex-row items-center mt-5">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 p-3">
            <LockClosedIcon className="h-5 w-5 text-white" />
          </span>
          <input
            className={`w-full px-3 py-[8px] font-medium ${styles.passwordField}`}
            type="password"
            name=""
            id="#id-11"
            placeholder="Password"
          />
        </div>
        <Link
          className="font-mediu text-blue-500 font-medium text-sm block my-7 mt-1 text-center hover:underline"
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
        <button className="bg-gradient-to-r from-indigo-400 to-cyan-400 hover:to-indigo-400 hover:from-cyan-400 px-10 py-3 text-white active:scale-95 font-medium w-full rounded-lg">
          Log in
        </button>
        <p className="font-medium mt-3 text-sm text-center">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
      </form>
      <div className="divider font-medium">OR</div>
      <button onClick={handleChangeModalState} className="bg-[#409899] px-10 py-3 text-white font-medium w-full rounded-lg my-3 flex justify-center items-center gap-3">
        <span>
          <img src={phone} alt="" />
        </span>
        Mobile Number
      </button>
      <button className="bg-[#DF4930] px-10 py-3 text-white font-medium w-full rounded-lg mb-3 flex justify-center items-center gap-3">
        <span>
          <img src={google} alt="" />
        </span>
        Continue with Google
      </button>
      <button className="bg-[#507CC0] px-10 py-3 text-white font-medium w-full rounded-lg flex justify-center items-center gap-3">
        <span>
          <img src={facebook} alt="" />
        </span>
        Continue with Facebook
      </button>
      <NumberVerificatonModal handleChangeModalState={handleChangeModalState} showModalX={showModalX} />
    </div>
  );
};

export default Login;
