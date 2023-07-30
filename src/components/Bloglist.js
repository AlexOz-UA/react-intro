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
  const [stateBlogs, setStateBlogs] = useState("");
  const isMounted = useRef(false);
  const [buttonClassName, setButtonClassName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  let { sortedBlogs: blogs } = useGet(`http://localhost:8800/pagination?page=${currentPage}&limit=${itemsPerPage}`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });

  const fetchData = async () => {
    if (
      localStorage.getItem("filteredBlogs") &&
      localStorage.getItem("categoryTitle") !== "Blogs with category: All blogs"
    ) {
      try {
        const response = await axios.post(
          `http://localhost:8800/pagination/categories?page=${currentPage}&limit=${itemsPerPage}`,
          { data: { id: localStorage.getItem("selectedOptions") } }
        );
        setStateBlogs(response.data.sortedBlogs);
        console.log("cycle1");
        setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
        return;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (
      localStorage.getItem("filteredBlogs") === "" &&
      localStorage.getItem("searchedBlogs") !== ""
    ) {
      const parsedPosts = JSON.parse(localStorage.getItem("searchedBlogs"));
      let selectedOptions = [];
      parsedPosts.forEach((element) => {
        selectedOptions.push(element.id);
      });
      try {
        const response = await axios.post(
          `http://localhost:8800/pagination/search?page=${currentPage}&limit=${itemsPerPage}`,
          { data: { postIds: selectedOptions } }
        );
        setStateBlogs(response.data.sortedBlogs);
        console.log("cycle2");
        setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
        return;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (!localStorage.getItem("popularBlogs") && localStorage.getItem("popularBlogs") === "") {
      try {
        const response = await axios.get(
          `http://localhost:8800/pagination?page=${currentPage}&limit=${itemsPerPage}`
        );
        setStateBlogs(response.data.sortedBlogs);
        console.log("cycle3");
        setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    handlePostSorting();
    setTimeout(() => {
      fetchData();
    }, 100);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setTimeout(() => {
      fetchData();
    }, 100);
    handlePostSorting();
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!isMounted.current) {
      try {
        let blogsData = axiosGet(`http://localhost:8800/pagination?page=${currentPage}&limit=${itemsPerPage}`, {
          headers: { "x-access-token": localStorage.getItem("token") },
        });
        blogsData.then((data) => {
          setStateBlogs(data.sortedBlogs);
          setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
          fetchData();
        });
      } catch (error) {
        console.error("There is an error: " + error);
      }
      isMounted.current = true;
    }
  }, [blogs]);

  const handleBlogChange = () => {
    if (localStorage.getItem("filteredBlogs") !== "") {
      blogs = JSON.parse(localStorage.getItem("filteredBlogs"));
      setStateBlogs(blogs);
    }
    if (localStorage.getItem("searchedBlogs") !== "") {
      blogs = JSON.parse(localStorage.getItem("searchedBlogs"));
      setStateBlogs(blogs);
    }
  };

  const handleSearch = (e) => {
    localStorage.setItem("filteredBlogs", "");
    localStorage.setItem("popularBlogs", "");
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
        fetchData();
        handleBlogChange();
        return JSON.stringify(res.data);
      });
  };

  const handleCategoryChange = async (e) => {
    localStorage.setItem("searchedBlogs", "");
    localStorage.setItem("popularBlogs", "");
    const selectElement = e.target;
    const options = selectElement.options;
    const selectedOptions = [];
    const selectedNames = [];
    const allCategoriesIds = [];

    categories.forEach((element) => {
      allCategoriesIds.push(element.id);
    });

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const option = options[i];
        const selectedId = option.getAttribute("data-category");
        selectedOptions.push(selectedId);
      }
    }

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const option = options[i];
        const selectedName = option.value;
        selectedNames.push(selectedName);
      }
    }
    localStorage.setItem("selectedOptions", selectedOptions);

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
          "Blogs with category: " + selectedNames
        );
        localStorage.setItem("selectedOptions", allCategoriesIds);
        fetchData();
        if (res.data.length === 0) {
          localStorage.setItem("categoryTitle", "No blogs with this category.");
        }
        return JSON.stringify(res.data);
      }
      const res = await axios.post("http://localhost:8800/categories-filter", {
        data: { id: selectedOptions },
      });

      if (res.status !== 200) {
        throw new Error("Could not fetch data for that resource");
      }

      localStorage.setItem("filteredBlogs", JSON.stringify(res.data));
      localStorage.setItem(
        "categoryTitle",
        "Blogs with category: " + selectedNames
      );
      fetchData();
      handleBlogChange();
      if (res.data.length === 0) {
        localStorage.setItem("categoryTitle", "No blogs with this category.");
      }
      return JSON.stringify(res.data);
    } catch (err) {
      console.error("There is an error: " + err);
    }
  };

  const handlePostSorting = () => {
    if (buttonClassName === "") {
      setButtonClassName("fa fa-arrow-up");
      fetch(`http://localhost:8800/pagination/popular-blogs/${currentPage}/${itemsPerPage}`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(
            "popularBlogs",
            JSON.stringify(data.sortedBlogs)
          );
          setStateBlogs(data.sortedBlogs);
        })
        .catch((error) => {
          console.error("Error fetching popular blogs:", error);
        });
    }
    
    if (buttonClassName === "fa fa-arrow-up") {
      setButtonClassName("");
      localStorage.setItem("popularBlogs", "");
      fetchData();
    }
  };

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
          height: "90px",
        }}
        multiple
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
          onClick={handlePostSorting}
        >
          Sort by Popularity
          <a className={buttonClassName} href="#top">
            {}
          </a>
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
        stateBlogs !== "TokenExpiredError: jwt expired" &&
        stateBlogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <h2 style={{ marginBottom: "5px" }}>{blog.name}</h2>
              <span className="fa fa-thumbs-up button-like">
                <span style={{ marginLeft: "5px" }}>{blog.num_likes}</span>
              </span>
              <h3 style={{ marginBottom: "5px" }}>{blog.creator}</h3>
              <p>{blog.body.substring(0, 20)}...</p>
            </Link>
          </div>
        ))}
      {stateBlogs === "TokenExpiredError: jwt expired" && <div></div>}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <li key={pageNumber}>
              <button onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          )
        )}
      </div>
    </div>
  );
};

export default Bloglist;
