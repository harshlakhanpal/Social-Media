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
      userRegister({
        variables: { username, email, password, confirmPassword },
      });
      history.push("/login");
    } catch (error) {
      console.log(Object.keys(error), error.message);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="input"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your Username"
      />
      <input
        className="input"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
      />
      <input
        className="input"
        type="password"
        value={password}
        label="Password"
        //   onPressEnter={handleLogin}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
      />
      <input
        className="input"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        label="Confirm Password"
        //   onPressEnter={handleLogin}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
      />
      <br />

      <button
        onClick={userRegistration}
        //   loading={loading}
        //   disabled={!username.length || !password.length}
      >
        Register
      </button>
      <br />
    </div>
  );
};

export default Register;
