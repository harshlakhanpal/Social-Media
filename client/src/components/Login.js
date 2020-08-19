import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../queries";
import { useHistory } from "react-router-dom";
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
    <div className="login">
      {loading && (
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      <h1>Login</h1>
      <input
        className="input"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />

      <input
        className="input"
        name="password"
        type="password"
        value={password}
        //   onPressEnter={handleLogin}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <br />
      <span onClick={() => history.push("/register")} className="link">
        Not a member? Register here.
      </span>
      <br />

      <button className="btn" onClick={userLogin}>
        Login
      </button>
      <br />
    </div>
  );
};

export default Login;
