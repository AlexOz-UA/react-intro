import React, { useState } from "react";
import useGet from "../hooks/https/useGet";
import axiosPost from "../helpFuncs/axiosPost";
import axios from "axios";
import axiosDelete from "../helpFuncs/axiosDelete";

const AdminPage = (props) => {

  const { data: categories } = useGet("http://localhost:8800/categories");
  const [categoryTitle, setCategoryTitle] = useState();
  const [categoryForDelete, setCategoryForDelete] = useState();
  const adminState = localStorage.getItem("isAdmin");

  function handleAllCommentsDelete() {
    axiosDelete(`http://localhost:8800/all-comments-delete`);
  }

  function handleAllPostsDelete() {
    axiosDelete(`http://localhost:8800/all-posts-delete`);
  }

  const handleCategoryAdd = () => {
    const data = { title: categoryTitle };
    axiosPost("http://localhost:8800/category-add", data);
  };

  const handleCategoryDelete = (e) => {
    axios
      .delete("http://localhost:8800/category-delete", {
        data: {
          id: categoryForDelete,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdminCheck = () => {
    if (adminState === "true") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {!handleAdminCheck() && <h1> You have no admin access. </h1>}
      {handleAdminCheck() && (
        <div className="admin-page">
          <h1 style={{ marginBottom: "10px" }}>Categories</h1>
          {categories &&
            categories.map((item) => (
              <h3 key={item.id} style={{ marginBottom: "10px" }}>
                Category: {item.title}
              </h3>
            ))}
          <form onSubmit={handleCategoryAdd} style={{ marginTop: "10px" }}>
            Add new category
            <input
              style={{ margin: "0px 10px 0px 10px" }}
              placeholder="New category..."
              required
              onChange={(e) => {
                setCategoryTitle(e.target.value);
              }}
            ></input>
            <button>Add</button>
          </form>
          <form style={{ marginTop: "10px" }} onSubmit={handleCategoryDelete}>
            Delete category
            <select
              style={{ margin: "0px 10px 0px 10px" }}
              onChange={(e) => {
                setCategoryForDelete(e.target.value);
              }}
            >
              {categories &&
                categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
            <button>Delete</button>
          </form>
          <button onClick={handleAllCommentsDelete}>Clear all comments</button>
          <form style={{ float: "right" }} onSubmit={handleAllPostsDelete}>
            <button>Clear all posts</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
