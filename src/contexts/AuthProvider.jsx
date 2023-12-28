import React, { createContext, useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [updateProfilePicture, setUpdateProfilePicture] = useState(false);
  const [updateProfileName, setUpdateProfileName] = useState(false);
  const recaptchaVerifierRef = useRef(null);
  const [visibleRecaptcha, setVisibleRecaptcha] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const generateRecaptcha = () => {
    // Create RecaptchaVerifier only once
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  };

  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    generateRecaptcha();
    if (recaptchaVerifierRef.current) {
      const appVerifier = recaptchaVerifierRef.current;
      return signInWithPhoneNumber(auth, "+" + phoneNumber, appVerifier);
    } else {
      // setRecaptchaError("Recaptcha not initialized");
    }
  };

  const resendOTP = (phoneNumber) => {
    // Clear existing RecaptchaVerifier before re-rendering
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
    }

    return sendOTP(phoneNumber);
  };

  const verifyOTP = (OTP) => {
    setLoading(true);
    let confirmationResult = window.confirmationResult;
    return confirmationResult.confirm(OTP);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
}


  const updateUserProfile = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const updateUserEmail = (email) => {
    console.log(email);
    return updateEmail(auth.currentUser, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user || user?.emailVerified || user?.phoneNumber) {
          setUser(user);
        } else {
          toast.warning("Your Email is not verified", {
            hideProgressBar: true,
            theme: "colored"
          })
          logout();
        }
        setLoading(false);
      },
      []
    );

    return () => unsubscribe();
  }, [updateProfilePicture, updateProfileName]);

  const authInfo = {
    loading,
    setLoading,
    sendOTP,
    verifyOTP,
    user,
    googleSignIn,
    updateUserProfile,
    updateUserEmail,
    setUpdateProfilePicture,
    setUpdateProfileName,
    resendOTP,
    visibleRecaptcha,
    setVisibleRecaptcha,
    logout,
    createUser,
    signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
