import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../store/app/actions";
import menu from "../assets/icons/bars-solid.svg";

const Header = () => {
  const loggedIn = useSelector((state) => state.app.user);
  const checkLoggedIn =
    Object.keys(loggedIn).length > 0 || localStorage.getItem("user")
      ? true
      : false;
  const dispatch = useDispatch();
  return (
    <div className="app-header">
      <h2>Social Media</h2>
      {/* {checkLoggedIn && (
        <span onClick={() => dispatch(toggleDrawer())}>
          <img src={menu} alt="logo" className="icon" />
        </span>
      )} */}
    </div>
  );
};
export default Header;
