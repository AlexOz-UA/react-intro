import { useParams } from "react-router-dom";
import { useState } from "react";
import useGet from "../hooks/https/useGet";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending, } = useGet(`http://localhost:8800/post/${id}`);
  const { data: comments } = useGet(`http://localhost:8800/comment/${id}`);
  let [newComment, setComment] = useState("");
  let [userName, setUserName] = useState("");

  function handleAllCommentsDelete() {
    axios.delete(`http://localhost:8800/allcommentsdelete/${id}`)
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  }

  function handleSubmit(e) {
    axios
      .post(`http://localhost:8800/comment/${id}`, {
        comment: newComment,
        username: userName,
      })
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  }

  function handlePostDelete() {
    axios
      .delete(`http://localhost:8800/delete/${id}`, {})
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        alert("Error:", error);
      });
  }

  function handleCommentDelete(commentId) {
    axios
      .delete(`http://localhost:8800/commentdelete`, {
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
          <h2>{blog.name}</h2>
          <h2>Written by {blog.author}</h2>
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
            <h3 style={{ position: "relative", top: "21px" }}>
              Write something new...
            </h3>
            <textarea
              placeholder="Write smth!"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <textarea
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
