import axios from "axios";
import { useEffect, useState } from "react";

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(url, { signal: abortCont.signal })
      .then((res) => {
        if (res.status != 200) {
          throw Error("could not fetch data for that resource");
        }
        console.log(res.data);
        setError(null);
        setData(res.data);
        setIsPending(false);
        return JSON.stringify(res);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch abborted");
        } else {
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useGet;
