"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import OTPInput, { ResendOTP } from "otp-input-react";
import telephone from "../../assets/icons/telephone2.png";
import "./NumberVerificationModal.css";
import sendOtp from "../../assets/icons/send-otp.png";
import { Modal } from "keep-react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";


export const NumberVerificatonModal = ({
  showModal,
  handleChangeModalState,
}) => {
  const {
    loading,
    sendOTP,
    setLoading,
    verifyOTP,
    resendOTP,
    visibleRecaptcha,
    setVisibleRecaptcha,
  } = useContext(AuthContext);

  const {theme, handleToggle} = useContext(ThemeContext);

  const [OTP, setOTP] = useState("");
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const handleSendOTP = async () => {
    await setVisibleRecaptcha(true);
    sendOTP(phone)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        toast.success("We successfully sent an OTP to your phone number", {
          hideProgressBar: true,
          theme: "colored"
        })
        setShowOTP(true);
        setLoading(false);
        setVisibleRecaptcha(false);
      })
      .catch((error) => {
        console.log(error);
        setShowOTP(false);
        setLoading(false);
        setVisibleRecaptcha(false);
        toast.error(error.message, {
          hideProgressBar: true,
          theme: "colored"
        })
      });
  };

  const handleVerifyOTP = () => {
    verifyOTP(OTP)
      .then((result) => {
        // User signed in successfully.
        let user = result.user;
        console.log(user);
        console.log("User signed in successfully");
        toast.success("✅ Your verification is successful.", {
          icon: <CheckIcon className="w-5 h-5 text-white" />,
          theme: "colored"
        });
        handleChangeModalState();
        setLoading(false);
        // ...
      })
      .catch((error) => {
        alert("User couldn't sign in (bad verification code?)");
        setLoading(false);
      });
  };

  const handleResendOTP = async () => {
    await setVisibleRecaptcha(true);
    resendOTP(phone)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("We successfully resent an OTP to your phone number", {
          hideProgressBar: true,
          theme: "colored"
        })
        setShowOTP(true);
        setLoading(false);
        setVisibleRecaptcha(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          hideProgressBar: true,
          theme: "colored"
        })
        setLoading(false);
        setVisibleRecaptcha(false);
        setShowOTP(false);
      });
  };

  return (
    <Modal
      icon={<CloudArrowUp size={28} color="#1B4DFF" />}
      size="2xl"
      show={showModal}
      onClose={handleChangeModalState}
    >
      <Modal.Body>
        <div className="flex flex-col items-center relative">
          {!showOTP ? (
            <div className="mx-auto w-72">
              <div className="flex justify-center my-5">
                <img className="h-10" src={telephone} alt="" />
              </div>
              <h3 className="my-2 text-2xl text-center font-semibold">
                Verify Your Number
              </h3>
              <p className="text-center mb-5">
                Verification code on its way! Please enter it to unlock your
                account.
              </p>

              <p className="mb-2 font-bold">Mobile Number</p>
              <PhoneInput
                autoFormat={false}
                disableDropdown
                countryCodeEditable={false}
                onlyCountries={["bd"]}
                country={"bd"}
                value={phone}
                onChange={setPhone}
              />
              <button
                onClick={handleSendOTP}
                disabled={phone.length !== 13 && "disabled"}
                className={`  ${
                  phone.length === 13
                    ? " bg-gradient-to-r from-indigo-400 to-cyan-400 active:scale-95"
                    : "bg-neutral-300"
                } text-white  mx-auto my-5 py-2  flex justify-center items-center gap-4 rounded-sm w-[300px]`}
              >
                {loading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                GET OPT
              </button>
              {visibleRecaptcha && <div id="recaptcha-container"></div>}
              <button
                onClick={handleChangeModalState}
                className="block mx-auto text-sm font-medium text-blue-600 underline hover:no-underline mt-3"
              >
                Login with other options
              </button>
            </div>
          ) : (
            <div>
              <img className="w-60 block mx-auto" src={sendOtp} alt="" />
              <p className="text-center mb-5 text-sm">
                Type the 6 digit code sent to this <br /> number{" "}
                <span className="text-blue-600 font-bold">{`"+${phone}"`}</span>{" "}
              </p>
              <OTPInput
                className="otp-container"
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                secure
              />
              <ResendOTP
                onResendClick={handleResendOTP}
                className="resend-otp"
              />
              <button
                onClick={handleVerifyOTP}
                className={` ${
                  OTP.length === 6
                    ? "bg-gradient-to-r from-indigo-400 to-cyan-400"
                    : "bg-neutral-300"
                }  text-white w-[270px] mx-auto my-5 py-2 rounded-sm flex justify-center items-center gap-4`}
              >
                {!visibleRecaptcha && loading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                VERIFY OTP
              </button>
              <button
                onClick={() => {
                  setShowOTP(false);
                  setPhone("");
                }}
                className="block mx-auto text-sm font-medium text-blue-600 hover:underline"
              >
                Change Phone Number
              </button>
            </div>
          )}

          <button
            onClick={() => {
              handleChangeModalState();
              setShowOTP(false);
              setLoading(false);
              setPhone(false);
            }}
            className="absolute top-0 right-0"
          >
            <XMarkIcon className="h-7 w-7 tex" />
          </button>
          <div id="recaptcha-container"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NumberVerificatonModal;
