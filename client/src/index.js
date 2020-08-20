import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import "./index.css";
import App from "./App";

const cache = new InMemoryCache({ addTypename: false });
const client = new ApolloClient({
  uri: "/graphql",
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
