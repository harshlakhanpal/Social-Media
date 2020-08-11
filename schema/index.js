const graphql = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, { headers: { authorization } }) {
        // code to get data from the DB
        //   console.log(args);
        const token = authorization;
        //   console.log(context);
        if (
          token !== "null" &&
          token !== "undefined" &&
          token !== "" &&
          token !== null &&
          token !== undefined
        ) {
          //  const verify = await jwt.verify(token, "mysecret");
          return User.findById(args.id);
        } else return { _id: "", name: "", email: "", token: "unavailable" };
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const user = await User.findOne({ email: args.email });
          if (!user) throw new Error("Email does not exist");
          const passwordIsValid = await bcrypt.compareSync(
            args.password,
            user.password
          );
          if (!passwordIsValid) throw new Error("Password incorrect");
          const token = jwt.sign({ id: user._id }, "mysecret");
          return { token, password: null, ...user._doc };
        } catch (err) {
          throw err;
        }
      },
    },
    products: {
      type: new GraphQLList(ProductType),

      async resolve(parent, args) {
        let products = await Product.find();
        return products;
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        //
        return Product.findById(args.id);
      },
    },
    productsByCategory: {
      type: new GraphQLList(ProductType),
      args: { category: { type: GraphQLString } },
      async resolve(parent, args) {
        let products = await Product.find({ category: args.category });
        return products;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          const { name, email, password } = args;

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("User already exists!");
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = new User(
            {
              email,
              name,
              password: hashedPassword,
            },
            (err) => {
              if (err) throw err;
            }
          );
          await user.save();
          const token = jwt.sign({ id: user._id }, "mysecret");
          return { token, password: null, ...user._doc };
        } catch (err) {
          throw err;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
