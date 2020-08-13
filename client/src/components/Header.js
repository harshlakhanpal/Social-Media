import React from "react";
import { Flex, Heading } from "@adobe/react-spectrum";
import ShowMenu from "@spectrum-icons/workflow/ShowMenu";
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
    <Flex
      flexBasis="8%"
      justifyContent={`${checkLoggedIn ? "space-between" : "center"}`}
      alignItems="center"
    >
      <Heading level="1">Social Media</Heading>
      {checkLoggedIn && (
        <span onClick={() => dispatch(toggleDrawer())}>
          <ShowMenu aria-label="showmenu" size="S" />
        </span>
      )}
    </Flex>
  );
};
export default Header;
