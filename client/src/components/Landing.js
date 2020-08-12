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
    <View>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading level="1" className="title">
          Welcome
        </Heading>
        <ButtonGroup>
          <Button variant="cta" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button variant="cta" onClick={() => history.push("/register")}>
            Sign up
          </Button>
        </ButtonGroup>
      </Flex>
    </View>
  );
};

export default Landing;
