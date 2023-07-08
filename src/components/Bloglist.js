import { Link } from "react-router-dom";
import useGet from "../hooks/https/useGet";
import { useState } from "react";
import axios from "axios";

const Bloglist = () => {
  const { data: categories } = useGet("http://localhost:8800/categories");
  const [title, setTitle] = useState("Blogs with category: All blogs");
  const { data: blogs,} = useGet("http://localhost:8800/posts", {
    headers: { "x-access-token": localStorage.getItem("token") },
  });

  const handleCategoryChange = (e) => {
    setTitle("Blogs with category: " + e.target.value);
    console.log(e.target.textContent)
    axios.get("http://localhost:8800/categories-filter", {data: {id: e.target.key}})
    .then((res) => {
      if (res.status !== 200) {
        throw Error("could not fetch data for that resource");
      }
      return JSON.stringify(res, res.data);
    })
    .catch((err) => {
      console.log(err)
    });
  }

  return (
    <div className="blog-list">
      <h2 className="main-title">{title}</h2>
      <select
        onChange={(e)=>handleCategoryChange(e)}
        name="category-select"
        id="categorySelect"
        style={{
          position:"relative",
          top:"-24px",
          marginLeft: "520px",
        }}
      >
        <option value="All blogs">All blogs</option>
        {categories &&
          categories.map((item) => (
            <option value={item.title} key={item.id}>
              {item.title}
            </option>
          ))}
      </select>
      {blogs &&
        blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <h2 style={{ marginBottom: "5px" }}>{blog.name}</h2>
              <h3 style={{ marginBottom: "5px" }}>{blog.creator}</h3>
              <p>{blog.body.substring(0, 20)}...</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Bloglist;
