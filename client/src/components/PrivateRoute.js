import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: MyComponent = null,
  render: MyRender = null,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          MyRender ? (
            MyRender(props)
          ) : MyComponent ? (
            <MyComponent {...props} />
          ) : null
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
