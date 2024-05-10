import { useEffect } from "react";
import { useState } from "react";

const useToken = (uid) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (uid) {
      fetch(`http://localhost:5000/jwt?uid=${uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [uid]);
  return [token];
};

export default useToken;
