import { Link, Redirect } from "react-router-dom";
import useGet from "../hooks/https/useGet";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Bloglistliked = () => {
  const { data: categories } = useGet("http://localhost:8800/categories");
  const title = localStorage.getItem("categoryTitle");
  if (!localStorage.getItem("categoryTitle"))
    localStorage.setItem("categoryTitle", "Blogs with category: All blogs");
  const titleClear = localStorage.getItem("categoryTitle").slice(20);
  const user_id = localStorage.getItem("userId");
  let { data: blogs } = useGet(`http://localhost:8800/posts-liked/${user_id}`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  const isRegistered = localStorage.getItem("userName");
  // const [blogs, setBlogs] = useState("");

  // useEffect(() => {
  //   const fetchBlogData = setInterval(async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.log("Token not available");
  //         return;
  //       }

  //       const blogsData = await axiosGet("http://localhost:8800/posts", {
  //         headers: { "x-access-token": token },
  //       });
  //       setBlogs(blogsData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 200);
  //   return () => clearInterval(fetchBlogData);
  // }, [blogs]);

  // useEffect(() => {
  //   if (localStorage.getItem("filteredBlogs") !== "")
  //   setBlogs(JSON.parse(localStorage.getItem("filteredBlogs")));
  // if (localStorage.getItem("searchedBlogs") !== "")
  //   setBlogs(JSON.parse(localStorage.getItem("searchedBlogs")));
  // }, [blogs])

//   if (localStorage.getItem("filteredBlogs") !== "")
//     blogs = JSON.parse(localStorage.getItem("filteredBlogs"));
//   if (localStorage.getItem("searchedBlogs") !== "")
//     blogs = JSON.parse(localStorage.getItem("searchedBlogs"));

//   const handleSearch = (e) => {
//     localStorage.setItem("filteredBlogs", "");
//     const searchBarValue = e.target.value;
//     axios
//       .post("http://localhost:8800/search-bar", {
//         data: { searchBar: searchBarValue },
//       })
//       .then((res) => {
//         if (res.status !== 200) {
//           throw new Error("Could not fetch data for that resource");
//         }
//         localStorage.setItem("searchedBlogs", JSON.stringify(res.data));
//         console.log(res.data);
//         return JSON.stringify(res.data);
//       });
//   };

//   const handleCategoryChange = async (e) => {
//     localStorage.setItem("searchedBlogs", "");
//     const selectedId =
//       e.target[e.target.selectedIndex].getAttribute("data-category");
//     const selectedName = e.target.value;

//     try {
//       if (e.target.value === "All blogs") {
//         const res = await axios.get("http://localhost:8800/posts", {
//           headers: { "x-access-token": localStorage.getItem("token") },
//         });

//         if (res.status !== 200) {
//           throw new Error("Could not fetch data for that resource");
//         }

//         localStorage.setItem("filteredBlogs", JSON.stringify(res.data));
//         localStorage.setItem(
//           "categoryTitle",
//           "Blogs with category: " + selectedName
//         );
//         console.log(res.data);
//         if (res.data.length === 0) {
//           localStorage.setItem("categoryTitle", "No blogs with this category.");
//         }
//         window.location.reload();
//         return JSON.stringify(res.data);
//       } else {
//         const res = await axios.post(
//           "http://localhost:8800/categories-filter",
//           {
//             data: { id: selectedId },
//           }
//         );

//         if (res.status !== 200) {
//           throw new Error("Could not fetch data for that resource");
//         }

//         localStorage.setItem("filteredBlogs", JSON.stringify(res.data));
//         localStorage.setItem(
//           "categoryTitle",
//           "Blogs with category: " + selectedName
//         );
//         window.location.reload();
//         console.log(res.data);
//         if (res.data.length === 0) {
//           localStorage.setItem("categoryTitle", "No blogs with this category.");
//         }
//         return JSON.stringify(res.data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//     window.location.reload();
//   };

  if(!isRegistered) {return <Redirect to='/login' />}

  return (
    <div className="blog-list">
      <h2 className="main-title">Blogs that you liked:</h2>
      {/* <select
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
      </select> */}
      {/* <div style={{ textAlign: "center", padding: "0px 0px 0px 0px" }}>
        {/* <input
            type="text"
            onChange={(e) => handleSearch(e)}
            maxLength={25}
            placeholder="Search..."
          />
        <form>
          <div style={{ textAlign: "center", padding: "0px 0px 0px 0px" }}>
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              maxLength={25}
              placeholder="Search..."
            />
          </div>
          <button>Search</button>
        </form>
      </div> */}
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

export default Bloglistliked;
