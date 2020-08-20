import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/app/actions";
import logouticon from "../assets/icons/logout.svg";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const loggedIn = useSelector((state) => state.app.user);
  const checkLoggedIn =
    Object.keys(loggedIn).length > 0 || localStorage.getItem("user")
      ? true
      : false;
  const dispatch = useDispatch();
  return (
    <div className="app-header">
      <h2>Social Media</h2>
      {checkLoggedIn && (
        <span
          style={{ marginRight: "1rem" }}
          onClick={async () => {
            await dispatch(logout());
            history.push("/login");
          }}
        >
          <img src={logouticon} alt="logout" className="icon" />
        </span>
      )}
    </div>
  );
};
export default Header;
