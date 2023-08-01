import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const isRegistered = localStorage.getItem("userName");
  const adminState = localStorage.getItem("isAdmin");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

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
        {/* {isRegistered && <Link to="/create">New Blog</Link>}
        {isRegistered && <Link to="/blogs-liked">Saved Blogs</Link>}
        {!isRegistered && <Link to="/register">Register</Link>}
        {!isRegistered && <Link to="/login">Login</Link>}
        {handleAdminCheck() && <Link to="/adminpanel">Admin</Link>}
        {isRegistered && (
          <button style={{ marginLeft: "23px" }} onClick={handleLogoutAction}>
            Logout
          </button>
        )} */}
        <nav>
          <div className="burger-menu-icon" onClick={handleBurgerClick}>
            <div className={`line ${menuOpen ? "open" : ""}`} />
            <div className={`line ${menuOpen ? "open" : ""}`} />
            <div className={`line ${menuOpen ? "open" : ""}`} />
          </div>
          <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
            <li className="burger-link">
              <Link to="/">Home</Link>
            </li>
            {isRegistered && (
              <li className="burger-link">
                <Link to="/create" onClick={handleMenuLinkClick}>
                  New Blog
                </Link>
              </li>
            )}
            {isRegistered && (
              <li className="burger-link">
                <Link to="/blogs-liked" onClick={handleMenuLinkClick}>
                  Saved Blogs
                </Link>
              </li>
            )}
            {!isRegistered && (
              <li className="burger-link">
                <Link to="/register" onClick={handleMenuLinkClick}>
                  Register
                </Link>
              </li>
            )}
            {!isRegistered && (
              <li className="burger-link">
                <Link to="/login" onClick={handleMenuLinkClick}>
                  Login
                </Link>
              </li>
            )}
            {handleAdminCheck() && (
              <li className="burger-link">
                <Link to="/adminpanel" onClick={handleMenuLinkClick}>
                  Admin
                </Link>
              </li>
            )}
            <div className="burger-buttons">
            {isRegistered && (
              <li>
                <button onClick={handleLogoutAction}>Logout</button>
              </li>
            )}
            {menuOpen && <li>
              <button onClick={() => setMenuOpen(false)}>Close</button>
            </li>}
            </div>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
