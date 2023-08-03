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
        <nav>
          <div
            className={`burger-menu-icon ${menuOpen ? "open" : ""}`}
            onClick={handleBurgerClick}
          >
            <div className={`line ${menuOpen ? "open" : ""}`} />
            <div className={`line ${menuOpen ? "open" : ""}`} />
            <div className={`line ${menuOpen ? "open" : ""}`} />
          </div>
          <ul className={`menu-list ${menuOpen ? "open" : "closed"}`}>
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
                  <a id="logout-button" onClick={handleLogoutAction}>
                    Logout
                  </a>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
