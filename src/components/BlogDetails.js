import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useGet from "../hooks/https/useGet";
import axios from "axios";
import axiosDelete from "../helpFuncs/axiosDelete";
import axiosPost from "../helpFuncs/axiosPost";
import axiosGet from "../helpFuncs/axiosGet";

const BlogDetails = () => {
  const adminState = localStorage.getItem("isAdmin");
  const isRegistered = localStorage.getItem("userName");
  const history = useHistory();
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useGet(`http://localhost:8800/post/${id}`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const { data: categories } = useGet(
    `http://localhost:8800/categories/${id}`,
    { headers: { "x-access-token": localStorage.getItem("token") } }
  );
  const user_id = localStorage.getItem("userId");
  const { data: like } = useGet(
    `http://localhost:8800/post/is-liked/${id}/${user_id}`
  );
  const { data: likesCount } = useGet(
    `http://localhost:8800/post/likes-count/${id}`
  );
  const { data: saved } = useGet(
    `http://localhost:8800/post/is-saved/${id}/${user_id}`
  );
  const { data: savedCount } = useGet(
    `http://localhost:8800/post/saved-count/${id}`
  );
  const { data: comments } = useGet(`http://localhost:8800/comment/${id}`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const [stateComments, setStateComments] = useState(null);
  const isMounted = useRef(false);

  let [newComment, setComment] = useState("");
  let userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!isMounted.current) {
      try {
        const commentsData = axiosGet(`http://localhost:8800/comment/${id}`, {
          headers: { "x-access-token": localStorage.getItem("token") },
        });
        commentsData.then((data) => {
          setStateComments(data);
        });
      } catch (error) {
        console.error("There is an error: " + error);
      }
      isMounted.current = true;
    }
  }, [comments, id]);

  const handleCommentsChange = async () => {
    const commentsData = axiosGet(`http://localhost:8800/comment/${id}`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    commentsData.then((data) => {
      setStateComments(data);
    });
  }

  const handleAdminCheck = () => {
    if (adminState === "true") {
      return true;
    } else {
      return false;
    }
  };

  function handleAllCommentsDelete() {
    axiosDelete(`http://localhost:8800/all-comments-delete/${id}`);
    handleCommentsChange();
  }

  function handleSubmit(e) {
    const data = { comment: newComment, username: userName };
    axiosPost(`http://localhost:8800/comment/${id}`, data);
    handleCommentsChange();
  }

  function handlePostDelete() {
    axiosDelete(`http://localhost:8800/delete/${id}`);
    history.push("/");
  }

  function handleCommentDelete(commentId) {
    axios
      .delete(`http://localhost:8800/comment-delete`, {
        data: { id: commentId },
      })
      .then((response) => {
        handleCommentsChange();
        return JSON.stringify(response);
      })
      .catch((error) => {
        handleCommentsChange();
        alert("Error:", error);
      });
  }

  const handleLikeClick = () => {
    if (like.likeStatus === true) {
      window.location.reload();
      axiosPost(`http://localhost:8800/post/unlike/${id}`, {
        user_id: user_id,
      });
    }
    if (like.likeStatus === false) {
      window.location.reload();
      axiosPost(`http://localhost:8800/post/like/${id}`, { user_id: user_id });
    }
  };

  const handleSaveClick = () => {
    if (saved.savedStatus === true) {
      window.location.reload();
      axiosPost(`http://localhost:8800/post/unsave/${id}`, {
        user_id: user_id,
      });
    }
    if (saved.savedStatus === false) {
      window.location.reload();
      axiosPost(`http://localhost:8800/post/save/${id}`, { user_id: user_id });
    }
  }

  return (
    <div className="blog-details">
      {localStorage.getItem("userName") && (
        <div>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {blog && (
            <article>
              <form onSubmit={handlePostDelete}>
                {handleAdminCheck() && (
                  <button style={{ float: "right" }}>Delete this post</button>
                )}
              </form>
              <form onSubmit={handleAllCommentsDelete}>
                {handleAdminCheck() && (
                  <button style={{ float: "right" }}>
                    Delete all commentaries
                  </button>
                )}
              </form>
              <h1>{blog && blog[0].name}</h1>
              <h2 className="blog-author">{blog && blog[0].creator}</h2>
              {categories &&
                categories.map((item) => (
                  <h2 key={item.id} id="category">
                    {item.title}
                  </h2>
                ))}
              {like && likesCount && (
                <span
                  className="fa fa-thumbs-up button-like"
                  style={{
                    color: like.likeStatus ? "red" : "#282828",
                  }}
                  onClick={handleLikeClick}
                >
                  <span style={{ paddingLeft: "5px" }}>
                    {likesCount[0].count}
                  </span>
                </span>
              )}
              {saved && savedCount && saved.savedStatus ? (
                <span
                  className="fa-solid fa-bookmark button-like"
                  style={{
                    paddingLeft: "10px"
                  }}
                  onClick={handleSaveClick}
                >
                  <span style={{ paddingLeft: "5px" }}>
                    {savedCount[0].count}
                  </span>
                </span>
               ) : saved && savedCount && (<span
                className="fa-regular fa-bookmark button-like"
                style={{
                  paddingLeft: "10px"
                }}
                onClick={handleSaveClick}
              >
                <span style={{ paddingLeft: "5px" }}>
                  {savedCount[0].count}
                </span>
              </span>) }
              <p className="blog-body">{blog && blog[0].body}</p>
              <label>Comment section:</label>
              {stateComments && (
                <div id="comment">
                  {stateComments.map((item) => (
                    <li key={item.id}>
                        {handleAdminCheck() && (
                          <button style={{ float: "right" }} onClick={() => handleCommentDelete(item.id)}>Delete</button>
                        )}
                      <h2>{item.username}</h2>
                      <p style={{ marginBottom: "20px" }}>{item.title}</p>
                    </li>
                  ))}
                </div>
              )}
              {isRegistered && (
                // <form onSubmit={handleSubmit}>
                <div>
                  <h3 style={{ position: "relative", top: "21.5px" }}>
                    Write something new...
                  </h3>
                  <textarea
                    required
                    maxLength={255}
                    placeholder="Write smth!"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button style={{ position: "relative", top: "-28px" }} onClick={handleSubmit}>
                    Post
                  </button>
                {/* </form> */}
                </div>
              )}
            </article>
          )}
        </div>
      )}
      {!localStorage.getItem("userName") && (
        <h1 className="not-loginned">You need to register/login at first.</h1>
      )}
    </div>
  );
};

export default BlogDetails;
