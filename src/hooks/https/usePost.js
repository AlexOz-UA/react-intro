import axios from "axios";
import { useEffect, useState } from "react";

const usePost = (url, postData) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(url, {
        name: postData.title,
        category: postData.category,
      })
      .then((res) => {
        if (res.status !== 200) {
          throw Error("could not fetch data for that resource");
        }
        setError(null);
        setIsPending(false);
        return JSON.stringify(res);
      })
      .catch((err) => {
        setError(err.message);
        alert(error);
      });

    return;
  }, [url]);

  return { isPending, error };
};

export default usePost;
