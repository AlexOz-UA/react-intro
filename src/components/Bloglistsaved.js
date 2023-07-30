import { Link, Redirect } from "react-router-dom";
import useGet from "../hooks/https/useGet";

const Bloglistliked = () => {
  if (!localStorage.getItem("categoryTitle"))
    localStorage.setItem("categoryTitle", "Blogs with category: All blogs");
  const user_id = localStorage.getItem("userId");
  let { data: blogs } = useGet(`http://localhost:8800/posts-saved/${user_id}`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  const isRegistered = localStorage.getItem("userName");

  if(!isRegistered) {return <Redirect to='/login' />}

  return (
    <div className="blog-list">
      <h2 className="main-title">Blogs that you`ve bookmarked</h2>
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
