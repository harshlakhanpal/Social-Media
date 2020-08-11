import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { login } from "../queries";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";

const Login = () => {
  const history = useHistory();
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
  let [userLogin, { called, loading, data, error }] = useLazyQuery(login, {
    variables: { email, password },
    pollInterval: 0,
  });
  //  await userLogin();
  console.log(loading, data, error);
  if (error) {
    loading = false;
    console.log(error.message);
  }
  if (data) {
    localStorage.setItem("token", JSON.stringify(data.login.token));
    localStorage.setItem("user", JSON.stringify(data.login));

    history.push("/shop");
  }
  if (loading) return <Loader />;

  //   };
  return (
    <div className="login neumorphic">
      <div>Login</div>
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
        onClick={userLogin}
        //   loading={loading}
        //   disabled={!username.length || !password.length}
      >
        Login
      </button>
      <br />
    </div>
  );
};

export default Login;
