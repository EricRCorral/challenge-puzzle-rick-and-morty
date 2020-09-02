import React from "react";

const Footer = () => {
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  return (
    <div className="footer">
      <strong>ERIC CORRAL</strong>
      <div className="right">{date}</div>
    </div>
  );
}

export default Footer;
