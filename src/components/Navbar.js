import { Link } from "react-router-dom";

const Navbar = () => {
  
  const isRegistered = localStorage.getItem("userName");
  const adminState = localStorage.getItem("isAdmin");

  const handleAdminCheck = () => {
    if (adminState === "true") {
      return true;
    } else {
      return false;
    }
  };

  const handleLogoutAction = () => {
    window.location.reload();
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <h1>React Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {isRegistered && <Link to="/create">New Blog</Link>}
        {isRegistered && <Link to="/blogs-liked">Saved Blogs</Link>}
        {!isRegistered && <Link to="/register">Register</Link>}
        {!isRegistered && <Link to="/login">Login</Link>}
        {handleAdminCheck() && <Link to="/adminpanel">Admin</Link>}
        {isRegistered && (
          <button style={{ marginLeft: "23px" }} onClick={handleLogoutAction}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
