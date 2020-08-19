const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./schema");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors(), bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://admin:harsh123@socialmedia.17u05.mongodb.net/social-media?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

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

app.use(
  "/playground",
  expressPlayground({
    endpoint: "/graphql",
  })
);
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(port, () => console.log("Server Running"));
