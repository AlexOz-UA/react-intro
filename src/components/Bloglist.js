import { Link } from "react-router-dom";
import useGet from "../hooks/https/useGet";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import axiosGet from "../helpFuncs/axiosGet";

const Bloglist = () => {
  const { data: categories } = useGet("http://localhost:8800/categories");
  const title = localStorage.getItem("categoryTitle");
  if (!localStorage.getItem("categoryTitle"))
    localStorage.setItem("categoryTitle", "Blogs with category: All blogs");
  const titleClear = localStorage.getItem("categoryTitle").slice(20);
  let { data: blogs } = useGet(`http://localhost:8800/posts`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  const [stateBlogs, setStateBlogs] = useState("");
  const isMounted = useRef(false);
  // const likeCounts = {};
  // const blogsIds = [];
  const [buttonClassName, setButtonClassName] = useState("");
  // if(blogs){
  //   blogs.forEach((blog) => {
  //     blogsIds.push(blog.id);
  //   })
  //   blogs.map((blog) => {
  //     axiosGet(`http://localhost:8800/post/likes-count/${blog.id}`)
  //   })
  //   console.log(blogsIds);
  // }

  useEffect(() => {
    if (!isMounted.current) {
      console.log("hello!");
      try {
        const blogsData = axiosGet(`http://localhost:8800/posts`, {
          headers: { "x-access-token": localStorage.getItem("token") },
        });
        blogsData.then((data) => {
          console.log(data);
          setStateBlogs(data);
        });
      } catch (error) {
        console.log(error);
      }
      isMounted.current = true;
    }
  }, [blogs]);

  // useEffect(() => {
  //   if (localStorage.getItem("filteredBlogs") !== "")
  //     setBlogs(JSON.parse(localStorage.getItem("filteredBlogs")));
  //   if (localStorage.getItem("searchedBlogs") !== "")
  //     setBlogs(JSON.parse(localStorage.getItem("searchedBlogs")));
  // }, [
  //   blogs,
  //   localStorage.getItem("searchedBlogs"),
  //   localStorage.getItem("Blogs"),
  // ]);
  const handleBlogChange = () => {
  if (localStorage.getItem("filteredBlogs") !== ""){
    blogs = (JSON.parse(localStorage.getItem("filteredBlogs")));
    setStateBlogs(blogs)
    console.log(blogs);
  }
  if (localStorage.getItem("searchedBlogs") !== ""){
    blogs = (JSON.parse(localStorage.getItem("searchedBlogs")));
    setStateBlogs(blogs)
    console.log(blogs);
  }
  }
    
  const handleSearch = (e) => {
    localStorage.setItem("filteredBlogs", "");
    const searchBarValue = e.target.value;
    axios
      .post("http://localhost:8800/search-bar", {
        data: { searchBar: searchBarValue },
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Could not fetch data for that resource");
        }
        localStorage.setItem("searchedBlogs", JSON.stringify(res.data));
        console.log(res.data);
        handleBlogChange();
        return JSON.stringify(res.data);
      });
  };

  const handleCategoryChange = async (e) => {
    localStorage.setItem("searchedBlogs", "");
    const selectedId =
      e.target[e.target.selectedIndex].getAttribute("data-category");
    const selectedName = e.target.value;

    try {
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
        handleBlogChange();
        if (res.data.length === 0) {
          localStorage.setItem("categoryTitle", "No blogs with this category.");
        }
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
        handleBlogChange();
        if (res.data.length === 0) {
          localStorage.setItem("categoryTitle", "No blogs with this category.");
        }
        return JSON.stringify(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostSorting = (e) => {
    if(buttonClassName === ""){
      setButtonClassName("fa fa-arrow-up")
    }
    if(buttonClassName === "fa fa-arrow-up"){
      setButtonClassName("fa fa-arrow-down")
    }
    if(buttonClassName === "fa fa-arrow-down"){
      setButtonClassName("fa fa-arrow-up")
    }
  }

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
            return (
              <option value={item.title} key={item.id} data-category={item.id}>
                {item.title}
              </option>
            );
          })}
      </select>
      <div style={{ textAlign: "center", padding: "0px 0px 10px 0px" }}>
        <button
          style={{ textAlign: "center", padding: "0px 0px 0px 0px" }}
          onClick={(e) => handlePostSorting(e)}
        >
          Sort by Popularity<a className={buttonClassName} href="#top">{}</a>
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "0px 0px 0px 0px" }}>
          <div style={{ textAlign: "center", padding: "0px 0px 10px 0px" }}>
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              maxLength={25}
              placeholder="Search..."
            />
          </div>
      </div>
      {stateBlogs &&
        stateBlogs.map((blog) => (
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
