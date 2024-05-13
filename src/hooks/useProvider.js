import { useEffect, useState } from "react";

const useProvider = (uid) => {
  const [isProvider, setIsProvider] = useState(false);
  const [isProviderLoading, setIsProviderLoading] = useState(true);
  useEffect(() => {
    if (uid) {
      fetch(`http://localhost:5000/users/provider/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.isPorvider);
          setIsProvider(data.isProvider);
          setIsProviderLoading(false);
        });
    }
  }, [uid]);

  return [isProvider, isProviderLoading];
};

export default useProvider;
