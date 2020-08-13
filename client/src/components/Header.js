import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { useSelector } from "react-redux";

const Header = () => {
  const loggedIn = useSelector((state) => state.app.user);

  const HeaderReturn = () => {
    console.log(loggedIn);
    if (Object.keys(loggedIn).length > 0) {
      return (
        <Flex flexBasis="8%" justifyContent="space-between" alignItems="center">
          <div>Social Media</div>
          <div>right</div>
        </Flex>
      );
    } else {
      return (
        <Flex flexBasis="8%" justifyContent="center" alignItems="center">
          <div>Social Media</div>
        </Flex>
      );
    }
  };

  return HeaderReturn();
};
export default Header;
