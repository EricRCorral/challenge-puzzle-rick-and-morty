import React from "react";
import { ERIC } from "../../assets/images";

const Footer = () => {
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  return (
    <div className="footer">
      <a href="https://github.com/ericrcorral" rel="noopener noreferrer" target="blank">
        <img className="footer-img" src={ERIC} alt="Eric Corral" />
      </a>
      
      <div className="right"><strong>{date}</strong></div>
    </div>
  );
};

export default Footer;
