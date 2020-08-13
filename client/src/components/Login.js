import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../queries";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../store/app/actions";
import {
  Flex,
  TextField,
  Heading,
  ProgressCircle,
  Dialog,
} from "@adobe/react-spectrum";
// import Loader from "./Loader";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) history.push("/home");
  }, []);

  let [userLogin, { called, loading, data, error }] = useMutation(login, {
    variables: { username, password },
    pollInterval: 0,
    onCompleted: (data) => {
      dispatch(loginAction(data.login));
      localStorage.setItem("token", JSON.stringify(data.login.token));
      localStorage.setItem("user", JSON.stringify(data.login));

      history.push("/home");
    },
  });

  //   console.log(loading, data, error);
  //   if (error) {
  //     console.log(error.message);
  //   }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="size-50"
      UNSAFE_className="neumorphic"
    >
      {loading && (
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
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
