import { Link } from "react-router-dom";
import axios from "axios"

const Navbar = () => {
    function handleAllCommentsDelete() {
        axios
          .delete(`http://localhost:8800/allcommentsdelete`)
          .then((response) => {
            console.log(response);
            return JSON.stringify(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      function handleAllPostsDelete() {
        axios
          .delete(`http://localhost:8800/allpostsdelete`)
          .then((response) => {
            console.log(response);
            return JSON.stringify(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
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