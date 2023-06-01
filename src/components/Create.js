import { useState } from "react";
import axiosPost from "../helpFuncs/axiosPost";
import { useHistory } from "react-router-dom";
import useGet from "../hooks/https/useGet";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [categoriesForPost, setCategoriesForPost] = useState([]);
  const history = useHistory();
  const { data: categories } = useGet("http://localhost:8800/categories")
  
    const handleSelectChange = (event) => {
      const options = event.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setCategoriesForPost(selectedValues);
      
    };

  const HandleSubmit = (e) => {
    const data = { name: title, body: body, postId: title, categoryId: categoriesForPost }
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
        <select onChange={handleSelectChange} multiple required maxLength={2}>
        {categories && categories.map((item) => (
          <option key={item.id} value={item.id}>{item.title}</option>
        ))}
        </select>
        {!isPending && <button>Add blog</button>}
        </form>
        {isPending && <button disabled>Adding blog...</button>}
    </div>
  );
};

export default Create;
