import { Link } from 'react-router-dom'

const Bloglist = ({ blogs, title}) => {

  window.onload = function() {
    localStorage.clear()
  }

  return (
    <div className="blog-list">
        <h2>{ title }</h2>
      {blogs && blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
          <h2>{blog.name}</h2>
          <p>{blog.body.substring(0,20)}...</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Bloglist;
