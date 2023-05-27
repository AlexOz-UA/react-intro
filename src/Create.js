import { useState } from "react";
import axios from "axios";
// import usePost from "./usePost";

const Create = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8800/postsadd", {
        name: title,
        category: category 
      })
      .then((res) => {
        if (res.status != 200) {
          throw Error("could not fetch data for that resource");
        }
        setError(null);
        setIsPending(false);
        setCategory("");
        setTitle("");
        return JSON.stringify(res);
      })
      .catch((err) => {
          setError(err.message);
      });
    return;
  };

  // usePost("http://localhost:8800/postsadd", blog);

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={HandleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog category:</label>
        <textarea
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></textarea>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
