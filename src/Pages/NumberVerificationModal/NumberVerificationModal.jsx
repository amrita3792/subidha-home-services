"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import OTPInput, { ResendOTP } from "otp-input-react";
import telephone from "../../assets/icons/send-otp.png";
import "./NumberVerificationModal.css";
import sendOtp from "../../assets/icons/otp-code.png";
import { Modal } from "keep-react";
import { CloudArrowUp } from "@phosphor-icons/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getDate } from "../../utilities/date";

export const NumberVerificatonModal = ({
  showModal,
  handleChangeModalState,
}) => {
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const {
    sendOTP,
    verifyOTP,
    resendOTP,
    visibleRecaptcha,
    setVisibleRecaptcha,
  } = useContext(AuthContext);

  const { theme } = useContext(ThemeContext);

  const [OTP, setOTP] = useState("");
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    await setVisibleRecaptcha(true);
    sendOTP(phone)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        toast.success("We successfully sent an OTP to your phone number", {
          hideProgressBar: true,
          theme: "colored",
        });
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
          theme: "colored",
        });
      });
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    verifyOTP(OTP)
      .then((result) => {
        // User signed in successfully.
        let user = result.user;
        var currentDate = getDate();
        const currentUser = {
          uid: user.uid,
          userName: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user?.photoURL
            ? user.photoURL
            : "https://i.ibb.co/M1qvZxP/user.png",
          signupDate: currentDate,
          lastLogin: currentDate,
        };

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              navigate(from, { replace: true });
              toast.success("Your verification is successful.", {
                theme: "colored",
              });
              handleChangeModalState();
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        // ...
      })
      .catch((error) => {
        alert("User couldn't sign in (bad verification code?)");
        setLoading(false);
      });
  };

  const handleResendOTP = async () => {
    setLoading(true);
    await setVisibleRecaptcha(true);
    resendOTP(phone)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("We successfully resent an OTP to your phone number", {
          hideProgressBar: true,
          theme: "colored",
        });
        setShowOTP(true);
        setLoading(false);
        setVisibleRecaptcha(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          hideProgressBar: true,
          theme: "colored",
        });
        setLoading(false);
        setVisibleRecaptcha(true);
        setShowOTP(false);
      });
  };

  return (
    <Modal
      id={`${theme === "dark" && "modal-theme"}`}
      icon={<CloudArrowUp size={28} color="#1B4DFF" />}
      size="2xl"
      show={showModal}
      onClose={handleChangeModalState}
    >
      <div>
        <div className="flex flex-col items-center relative">
          {!showOTP ? (
            <div className="mx-auto w-72">
              <div className="flex justify-center my-5">
                <img className="w-40" src={telephone} alt="" />
              </div>
              <h3 className="my-2 text-2xl text-center font-semibold">
                Verify Your Number
              </h3>
              <p className="text-center mb-5 text-sm font-semibold">
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
                    ? "btn bg-[#FF6600] hover:bg-[#1D2736]  text-white"
                    : "bg-neutral-300"
                }  mx-auto my-5 py-2  flex justify-center items-center gap-4 rounded-sm w-[300px] font-semibold`}
              >
                {loading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                GET OTP
              </button>
              {visibleRecaptcha && <div id="recaptcha-container"></div>}
              <button
                onClick={handleChangeModalState}
                className="block mx-auto text-sm font-semibold text-blue-500 underline hover:no-underline mt-3"
              >
                Login with other options
              </button>
            </div>
          ) : (
            <div>
              <img className="w-48 block mx-auto" src={sendOtp} alt="" />
              <p className="text-center font-semibold mb-5 ">
                Type the 6 digit code sent to this <br /> number{" "}
                <span className="text-blue-500 font-semibold">{`"+${phone}"`}</span>{" "}
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
                disabled={OTP.length !== 6 && "disabled"}
                onClick={handleVerifyOTP}
                className={` ${
                  OTP.length === 6
                    ? "btn bg-[#FF6600] hover:bg-[#1D2736]  text-white"
                    : "bg-neutral-300"
                }   w-[270px] mx-auto my-5 py-2 rounded-sm flex justify-center items-center gap-4 font-semibold`}
              >
                {!visibleRecaptcha && loading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                Verify OTP
              </button>
              <button
                onClick={() => {
                  setShowOTP(false);
                  setPhone("");
                }}
                className="block mx-auto text-sm font-semibold text-blue-500 hover:underline mb-3"
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
            className="btn btn-circle absolute top-0 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </Modal>
  );
};

export default NumberVerificatonModal;
