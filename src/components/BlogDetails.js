import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import useGet from "../hooks/https/useGet";
import useGetWithData from "../hooks/https/useGetWithData";
import axios from "axios";
import axiosDelete from "../helpFuncs/axiosDelete";
import axiosPost from "../helpFuncs/axiosPost";

const BlogDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data: blog, error, isPending, } = useGet(`http://localhost:8800/post/${id}`);
  const { data: comments } = useGet(`http://localhost:8800/comment/${id}`);
  const { data: categories } = useGetWithData(`http://localhost:8800/categories/${id}`, {title: blog && blog[0] && blog[0].name});
  if(categories) console.log(categories);

  let [newComment, setComment] = useState("");
  let [userName, setUserName] = useState("");

  function handleAllCommentsDelete() {
    axiosDelete(`http://localhost:8800/all-comments-delete/${id}`);
  }

  function handleSubmit(e) {
    const data = {comment: newComment, username: userName}
    axiosPost(`http://localhost:8800/comment/${id}`, data)
  }

  function handlePostDelete() {
    axiosDelete(`http://localhost:8800/delete/${id}`);
    history.push('/');
  }

  function handleCommentDelete(commentId) {
    axios
      .delete(`http://localhost:8800/comment-delete`, {
        data: { id: commentId },
      })
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  }


  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <form onSubmit={handlePostDelete}>
          <button style={{ float: "right" }}>Delete this post</button>
          </form>
          <form onSubmit={handleAllCommentsDelete}>
            <button style={{ float: "right" }}>Delete all commentaries</button>
          </form>
         <h1>{blog && blog[0].name}</h1>
         {categories && categories.map((item) => (
                  <h2 key={item.id} id="category">{item.title}</h2>
              ))}
          <p className="blog-body">{blog && blog[0].body}</p>
          <label>Comment section:</label>
          {comments && (
            <div id="comment">
              {comments.map((item) => (
                <li key={item.id}>
                  <form onSubmit={() => handleCommentDelete(item.id)}>
                    <button style={{ float: "right" }}>Delete</button>
                  </form>
                  <h2>{item.username}</h2>
                  <p style={{ marginBottom: "20px" }}>{item.title}</p>
                </li>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <h3 style={{ position: "relative", top: "21.5px" }}>
              Write something new...
            </h3>
            <textarea
              required
              maxLength={255}
              placeholder="Write smth!"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <textarea
              required
              maxLength={20}
              placeholder="Write your name!!"
              onChange={(e) => setUserName(e.target.value)}
            ></textarea>
            <button style={{ position: "relative", top: "-28px" }}>Post</button>
          </form>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
