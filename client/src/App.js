import React from "react";
// import "./App.scss";
import { Provider, defaultTheme, Flex } from "@adobe/react-spectrum";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Provider theme={defaultTheme}>
      <Flex direction="column" width="100%" height="96vh">
        <Header />
        <Flex flexBasis="90%" alignItems="center" justifyContent="center">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={Home} />

            <PageNotFound />
          </Switch>
        </Flex>
      </Flex>
    </Provider>
  );
}

export default App;
