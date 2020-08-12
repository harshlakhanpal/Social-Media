import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../queries";
import { useHistory } from "react-router-dom";
import { Flex, TextField, Heading } from "@adobe/react-spectrum";
// import Loader from "./Loader";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let [userLogin, { called, loading, data, error }] = useMutation(login, {
    variables: { username, password },
    pollInterval: 0,
  });

  console.log(loading, data, error);
  if (error) {
    loading = false;
    console.log(error.message);
  }
  if (data) {
    localStorage.setItem("token", JSON.stringify(data.login.token));
    localStorage.setItem("user", JSON.stringify(data.login));

    history.push("/home");
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="size-50"
      UNSAFE_className="neumorphic"
    >
      <Heading level="1">Login</Heading>
      <TextField
        label="Username"
        name="username"
        value={username}
        onChange={setUsername}
        placeholder="Enter your username"
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        //   onPressEnter={handleLogin}
        onChange={setPassword}
        placeholder="Enter your password"
      />
      <br />

      <button
        className="input"
        type="primary"
        onClick={userLogin}
        //   loading={loading}
        //   disabled={!username.length || !password.length}
      >
        Login
      </button>
      <br />
    </Flex>
  );
};

export default Login;
