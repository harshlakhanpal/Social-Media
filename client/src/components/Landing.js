import React from "react";
import { View, Button, Heading } from "@adobe/react-spectrum";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  return (
    <View>
      <Heading level="1" className="title">
        Welcome
      </Heading>
      <>
        <Button onClick={() => history.push("/login")}>Login</Button>
        <Button onClick={() => history.push("/register")}>Sign up</Button>
      </>
    </View>
  );
};

export default Landing;
