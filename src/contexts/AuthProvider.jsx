import React, { createContext, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  function onCaptchVerify(phoneNumber) {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup(phoneNumber);
          },
          "expired-callback": () => {},
        },
      );
    }
  }

  function onSignup(phoneNumber) {
    setLoading(true);
    onCaptchVerify(phoneNumber);

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNumber;

    return signInWithPhoneNumber(auth, formatPh, appVerifier)
      
  }

  function onOTPVerify(OTP) {
    console.log(OTP);
    setLoading(true);
    return window.confirmationResult.confirm(OTP);
      
  }

  const authInfo = {
    onSignup,
    onOTPVerify,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
