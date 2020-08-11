import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <section className="home">
      <div className="title">Welcome</div>
      <div className="button-group">
        <button className="button" onClick={() => history.push("/login")}>
          Login
        </button>
        <button className="button" onClick={() => history.push("/register")}>
          Sign up
        </button>
      </div>
    </section>
  );
};

export default Home;
