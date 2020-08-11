const express = require("express");
const bodyParser = require("body-parser");

const { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const cors = require("cors");
const mongoose = require("mongoose");
// const schema = require("./schema");

// require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors(), bodyParser.json());

// app.use("/auth", authRoutes);

// const checkToken = expressJwt({ secret: "mysecret", algorithms: ["RS256"] });

app.use(
  "/graphql",
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema,
      graphiql: true,
      introspection: true,
      context: {
        headers: req.headers,
      },
    };
  })
);
mongoose
  .connect(
    `mongodb+srv://admin:harsh123@socialmedia.17u05.mongodb.net/social-media?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(
  "/playground",
  expressPlayground({
    endpoint: "/graphql",
  })
);

app.listen(port, () => console.log("Server Running"));
