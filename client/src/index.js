import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
