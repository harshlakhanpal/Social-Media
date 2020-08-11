import React from "react";
import "./App.scss";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <PageNotFound />
        </Switch>
      </div>
    </div>
  );
}

export default App;
