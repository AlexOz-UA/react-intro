import React from "react";
import reactIcon from "../images/react-icon.png";
import jsIcon from "../images/js-icon.png";
import htmlIcon from "../images/html-icon.png";
import cssIcon from "../images/css-icon.png";
import bootstrapIcon from "../images/bootstrap-icon.png";

const Footer = (props) => {
  
  return (
    <div>
      <footer className="footer">
        <div className="footer-text">
          <span>Made with help of</span>
          <img src={reactIcon} alt="React Icon" className="footer-icon" />
          <img src={jsIcon} alt="JavaScript Icon" className="footer-icon" />
          <img src={htmlIcon} alt="HTML Icon" className="footer-icon" />
          <img src={cssIcon} alt="CSS Icon" className="footer-icon" />
          <img
            src={bootstrapIcon}
            alt="Bootstrap Icon"
            className="footer-icon"
          />
        </div>
        <div className="footer-text">
          <span>
            Copyright <i className="fas fa-copyright"></i> 2023 All rights
            reserved
          </span>
        </div>
        <div className="footer-text">
          <span>Made by Ozatskyi Oleksii</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
