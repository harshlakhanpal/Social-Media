import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
// import * as compose from "lodash.flowright";
import Loader from "./Loader";
import { register } from "../queries";
import { useHistory } from "react-router-dom";
import { Flex, TextField, Heading } from "@adobe/react-spectrum";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRegister, { loading }] = useMutation(register);

  const userRegistration = async () => {
    try {
      await userRegister({
        variables: { username, email, password, confirmPassword },
      });
      history.push("/login");
    } catch (error) {
      console.log(Object.keys(error), error.message);
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="size-25"
    >
      <Heading level="1">Register</Heading>
      <TextField
        label="Username"
        value={username}
        onChange={setUsername}
        placeholder="Enter your Username"
      />
      <TextField
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your Email"
      />
      <TextField
        type="password"
        value={password}
        label="Password"
        //   onPressEnter={handleLogin}
        onChange={setPassword}
        placeholder="Enter your Password"
      />
      <TextField
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        label="Confirm Password"
        //   onPressEnter={handleLogin}
        onChange={setConfirmPassword}
        placeholder="Confirm your password"
      />
      <br />

      <button
        className="input"
        type="primary"
        onClick={userRegistration}
        //   loading={loading}
        //   disabled={!username.length || !password.length}
      >
        Register
      </button>
      <br />
    </Flex>
  );
};

export default Register;
