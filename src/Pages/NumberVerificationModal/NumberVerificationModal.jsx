"use client";
import { useState } from "react";
import { Modal, Button } from "keep-react";
import { CloudArrowUp } from "phosphor-react";
import android from "../../assets/icons/android.png";
import OTPInput, { ResendOTP } from "otp-input-react";
import "./NumberVerificationModal.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import telephone from "../../assets/icons/telephone2.png";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const NumberVerificatonModal = ({
  handleChangeModalState,
  showModalX,
}) => {
  const [OTP, setOTP] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <Modal
        icon={<CloudArrowUp size={28} color="#1B4DFF" />}
        size="2xl"
        show={showModalX}
        onClose={handleChangeModalState}
      >
        <Modal.Body>
          <div className="flex flex-col items-center relative">
            <div>
              <div className="flex justify-center my-5">
                <img className="h-10" src={telephone} alt="" />
              </div>
              <p className="my-5 font-bold text-center">
                VERIFY YOUR PHONE NUMBER
              </p>
              <p className="mb-2 font-bold">Mobile Number</p>
              <PhoneInput country={"bd"} value={phone} onChange={setPhone} />
              <button className="text-lg font-medium bg-gradient-to-r from-indigo-400 to-cyan-400 text-white w-full mx-auto block my-5 py-2 rounded-lg">
                Send code via SMS
              </button>
              <button onClick={handleChangeModalState} className="block mx-auto text-sm font-medium text-blue-600 underline hover:no-underline">
                Login with other options
              </button>
            </div>

            {/* <div>
              <img className="w-60 block mx-auto" src={sendOtp} alt="" />
              <p className="text-center mb-5 text-sm font-medium">
                Type the 4 digit code sent to this <br /> number{" "}
                <span className="text-blue-600">{`"${+8801311929644}"`}</span>{" "}
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
                className="resend-otp"
                onResendClick={() => console.log("Resend clicked")}
              />
              <button className="text-lg font-medium bg-gradient-to-r from-indigo-400 to-cyan-400 text-white w-[270px] mx-auto block my-5 py-2 rounded-lg">
                Verify OTP
              </button>
              <button className="block mx-auto text-sm font-medium text-blue-600 hover:underline">
                Change Phone Number
              </button>
            </div> */}

            <button onClick={handleChangeModalState} className="absolute top-0 right-0">
              <XMarkIcon className="h-7 w-7 tex" />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NumberVerificatonModal;
