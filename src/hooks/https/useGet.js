import axios from "axios";
import { useEffect, useState } from "react";

const useGet = (url, headers) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get(url, headers)
      .then((res) => {
        if (res.status !== 200) {
          throw Error("could not fetch data for that resource");
        }
        setError(null);
        setData(res.data);
        setIsPending(false);
        return JSON.stringify(res);
      })
      .catch((err) => {
        setError(err.message);
        alert(error)
      });
  }, [url,error]);

  return { data, isPending, error };
};

export default useGet;
