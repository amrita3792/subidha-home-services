import { useEffect, useState } from "react";

const useProvider = (uid) => {
  const [isProvider, setIsProvider] = useState(false);
  const [isProviderLoading, setIsProviderLoading] = useState(true);
  useEffect(() => {
    if (uid) {
      fetch(`https://subidha-home-services-server3792.glitch.me/users/provider/${uid}`)
        .then((res) => res.json())
        .then((data) => {

          setIsProvider(data.isProvider);
          setIsProviderLoading(false);
        }).catch(error => {
          setIsProviderLoading(false);
        })
    }
  }, [uid]);

  return [isProvider, isProviderLoading];
};

export default useProvider;
