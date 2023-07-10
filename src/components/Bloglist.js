import { Link } from "react-router-dom";
import useGet from "../hooks/https/useGet";
import axios from "axios";
import { useState } from "react";

const Bloglist = () => {
  const { data: categories } = useGet("http://localhost:8800/categories");
  const title = localStorage.getItem("categoryTitle");
  let key = "";
  if(!localStorage.getItem("categoryTitle")) localStorage.setItem("categoryTitle", "Blogs with category: All blogs")
  const titleClear = localStorage.getItem("categoryTitle").slice(20);
  let { data: blogs } = useGet("http://localhost:8800/posts", {
    headers: { "x-access-token": localStorage.getItem("token") },
  });

  const handleCategoryChange = async (e) => {
    const selectedValue = e.target.value; // The selected value (title and id)
    const selectedId = selectedValue.split(',')[1];
    const selectedName = selectedValue.split(',')[0]
    try {
      console.log(e.target.textContent);

      if (e.target.value === "All blogs") {
        const res = await axios.get("http://localhost:8800/posts", {
          headers: { "x-access-token": localStorage.getItem("token") },
        });

        if (res.status !== 200) {
          throw new Error("Could not fetch data for that resource");
        }

        localStorage.setItem("filteredBlogs", JSON.stringify(res.data));
        localStorage.setItem(
          "categoryTitle",
          "Blogs with category: " + selectedName
        );
        console.log(res.data);
        if (res.data.length === 0) {
          localStorage.setItem("categoryTitle", "No blogs with this category.");
        }
        window.location.reload();
        return JSON.stringify(res.data);
      } else {
        const res = await axios.post(
          "http://localhost:8800/categories-filter",
          {
            data: { id: selectedId },
          }
        );

        if (res.status !== 200) {
          throw new Error("Could not fetch data for that resource");
        }

        localStorage.setItem("filteredBlogs", JSON.stringify(res.data));
        localStorage.setItem(
          "categoryTitle",
          "Blogs with category: " + selectedName
        );
        console.log(res.data);
        if (res.data.length === 0) {
          localStorage.setItem("categoryTitle", "No blogs with this category.");
        }
        window.location.reload();
        return JSON.stringify(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  blogs = JSON.parse(localStorage.getItem("filteredBlogs"));
  console.log(blogs);

  return (
    <div className="blog-list">
      <h2 className="main-title">{title}</h2>
      <select
        onChange={(e) => handleCategoryChange(e)}
        name="category-select"
        id="categorySelect"
        style={{
          position: "relative",
          top: "-24px",
          marginLeft: "520px",
        }}
      >
        <option value={titleClear}>
          {localStorage.getItem("categoryTitle") ===
            "No blogs with this category." && "No blogs."}
          {localStorage.getItem("categoryTitle") !==
            "No blogs with this category." && titleClear}
        </option>
        <option value="All blogs">All blogs</option>
        {categories &&
          categories.map((item) => {
            key = item.id;
            return (
              <option value={`${item.title},${item.id}`} key={item.id}>
                {item.title}
              </option>
            );
          })}
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
