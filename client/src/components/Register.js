import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
// import * as compose from "lodash.flowright";
import { toast } from "react-toastify";
import { register } from "../queries";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRegister, { loading }] = useMutation(register);

  const userRegistration = async () => {
    userRegister({
      variables: { username, email, password, confirmPassword },
      onCompleted: async (data) => {
        toast.success("User registered successfully", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      },
      onError: (error) => {
        toast.error("User registration failed,Please try again", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      },
    });
    history.push("/login");
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
      <span onClick={() => history.push("/login")} className="link">
        Already a member? Login.
      </span>
      <br />
      <button
        className="btn"
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
