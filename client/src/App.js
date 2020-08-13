import React from "react";
// import "./App.scss";
import { Provider, defaultTheme, Flex } from "@adobe/react-spectrum";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";
import Drawer from "./components/Drawer";
import Register from "./components/Register";
import Post from "./components/Post";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";

const App = () => {
  return (
    <Provider theme={defaultTheme} UNSAFE_style={{ background: "transparent" }}>
      <Flex
        direction="column"
        width="100%"
        minHeight="100%"
        height="96vh"
        position="relative"
      >
        <Header />
        <Drawer />

        <Flex height="100%" alignItems="center" justifyContent="center">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute
              exact
              path="/home/create_post"
              component={CreatePost}
            />
            <PrivateRoute exact path="/home/:postId" component={Post} />

            <PageNotFound />
          </Switch>
        </Flex>
      </Flex>
    </Provider>
  );
};

export default App;
