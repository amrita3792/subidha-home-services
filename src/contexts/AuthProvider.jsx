import React, { createContext } from "react";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ chidren }) => {

  const authInfo = {

  }

  return (
    <AuthContext.Provider value={authInfo}>
        {chidren}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
