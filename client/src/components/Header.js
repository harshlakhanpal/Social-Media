import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../store/app/actions";

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
      {checkLoggedIn && (
        <span onClick={() => dispatch(toggleDrawer())}>My menu</span>
      )}
    </div>
  );
};
export default Header;
