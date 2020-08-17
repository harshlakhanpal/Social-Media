import React from "react";
import {
  View,
  Button,
  Heading,
  ButtonGroup,
  Flex,
} from "@adobe/react-spectrum";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <h1 className="title">Welcome</h1>
      <ButtonGroup>
        <button variant="cta" onClick={() => history.push("/login")}>
          Login
        </button>
        <button variant="cta" onClick={() => history.push("/register")}>
          Sign up
        </button>
      </ButtonGroup>
    </div>
  );
};

export default Landing;
