import React, { useState } from "react";
import useGet from "../hooks/https/useGet";
import axiosPost from "../helpFuncs/axiosPost";
import axios from "axios";

const AdminPage = (props) => {
  const { data: categories } = useGet("http://localhost:8800/categories");
  const [categoryTitle, setCategoryTitle] = useState();
  const [categoryForDelete, setCategoryForDelete] = useState();

  const handleCategoryAdd = () => {
    const data = {title: categoryTitle};
    axiosPost("http://localhost:8800/category-add", data);
  };

  const handleCategoryDelete = (e) => {
    axios.delete("http://localhost:8800/category-delete", {data: {
        id: categoryForDelete
    }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-page">
      <h1 style={{ marginBottom: "10px" }}>Categories</h1>
      {categories &&
        categories.map((item) => (
          <h3 key={item.id} style={{ marginBottom: "10px" }}>Category: {item.title}</h3>
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
        <select style={{ margin: "0px 10px 0px 10px" }} onChange={(e) => {setCategoryForDelete(e.target.value)}}>
        {categories && categories.map((item) => (
          <option key={item.id} value={item.id}>{item.title}</option>
        ))}
        </select>
        <button>Delete</button>
      </form>
    </div>
  );
};

export default AdminPage;
