import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import add from "../assets/icons/Add.svg";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();

  const loggedIn = useSelector((state) => state.app.user);
  const checkLoggedIn =
    Object.keys(loggedIn).length > 0 || localStorage.getItem("user")
      ? true
      : false;

  return (
    <>
      {checkLoggedIn ? (
        location.pathname !== "/home/create_post" ? (
          <div
            className="footer"
            onClick={() => history.push("/home/create_post")}
          >
            <img
              src={add}
              style={{ height: "2.4rem", width: "2.4rem" }}
              alt="New post"
              className="icon"
            />
          </div>
        ) : (
          <div className="footer">
            <img
              src={add}
              style={{ height: "2.4rem", width: "2.4rem" }}
              alt="New post"
              className="icon"
            />
          </div>
        )
      ) : null}
    </>
  );
};

export default Footer;
