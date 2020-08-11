import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
// import * as compose from "lodash.flowright";
import { register } from "../queries";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({});

  const [userRegister] = useMutation(register);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const userRegistration = async () => {
    try {
      await userRegister({
        variables: { ...values },
      });
      history.push("/");
    } catch (error) {
      console.log(Object.keys(error), error.message);
    }
  };

  return (
    <div className="register neumorphic">
      <input
        className="input"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        className="input"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        className="input"
        name="password"
        value={values.password}
        //   onPressEnter={handleLogin}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="password"
        className="input"
        name="confirmPassword"
        value={values.confirmPassword}
        //   onPressEnter={handleLogin}
        onChange={handleChange}
        placeholder="Confirm Password"
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
    </div>
  );
};

export default Login;
