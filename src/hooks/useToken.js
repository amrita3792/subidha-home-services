import { useEffect } from "react";
import { useState } from "react";

const useToken = (uid) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (uid) {
      fetch(`https://subidha-home-services-server3792.glitch.me/jwt?uid=${uid}`)
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
