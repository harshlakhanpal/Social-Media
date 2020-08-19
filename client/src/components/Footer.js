import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const loggedIn = useSelector((state) => state.app.user);
  const checkLoggedIn =
    Object.keys(loggedIn).length > 0 || localStorage.getItem("user")
      ? true
      : false;
  return <>{checkLoggedIn ? <div className="footer">Footer</div> : null}</>;
};

export default Footer;
