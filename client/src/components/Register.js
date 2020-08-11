import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import * as compose from "lodash.flowright";
import { register } from "../queries";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleLogin = async () => {
  //  try {
  //    const { data } = await axios.post("http://localhost:5000/auth/login", {
  //      email,
  //      password,
  //    });
  //    console.log(data);
  //    console.log(JSON.stringify(data));
  //    localStorage.setItem("token", JSON.stringify(data.token));
  //    history.push("/user");
  //  } catch (err) {
  //    console.log(err);
  //  }
  const [userRegister] = useMutation(register);

  const userRegistration = async () => {
    await userRegister({
      variables: { name, email, password },
    });
    history.push("/");
  };
  //  await userLogin();
  //   console.log(called, loading, data);
  //   if (called && loading) return <p>Loading ...</p>;
  //   if (data) {
  //     localStorage.setItem("token", JSON.stringify(data.login.token));
  //     localStorage.setItem("user", JSON.stringify(data.login));

  //     history.push("/user");
  //   }
  //   };
  return (
    <div className="register neumorphic">
      <input
        className="input"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        placeholder="Name"
      />
      <input
        className="input"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        placeholder="Email"
      />
      <input
        type="password"
        className="input"
        value={password}
        //   onPressEnter={handleLogin}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Password"
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
