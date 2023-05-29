import { useState } from "react";
import axiosPost from "../helpFuncs/axiosPost";
import { useHistory } from "react-router-dom";
import useGet from "../hooks/https/useGet";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const { data: categories } = useGet("http://localhost:8800/categories")

  const HandleSubmit = (e) => {
    const data = { name: title, body: body }
    e.preventDefault();
    axiosPost("http://localhost:8800/posts-add", data);
    history.push("/")
    setIsPending(false);
  };

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={HandleSubmit}>
        <label>Blog title:</label>
        <input
          maxLength={25}
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          maxLength={1000}
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <select>
        {categories && categories.map((item) => (
          <option>{item.title}</option>
        ))}
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
