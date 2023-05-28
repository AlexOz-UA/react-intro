import { Link } from "react-router-dom";
import axiosDelete from "../helpFuncs/axiosDelete";

const Navbar = () => {
    function handleAllCommentsDelete() {
        axiosDelete(`http://localhost:8800/all-comments-delete`);
    }

    function handleAllPostsDelete() {
      axiosDelete(`http://localhost:8800/all-posts-delete`);
    }

    return (
        <nav className="navbar">
            <h1>React Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <Link to="/login">Login</Link>
                <button onClick={handleAllCommentsDelete}>Clear all comments</button>
                <form style={{float:"left"}} onSubmit={handleAllPostsDelete}><button>Clear all posts</button></form>
            </div>
        </nav>
    );
}
 
export default Navbar;