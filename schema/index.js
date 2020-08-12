const graphql = require("graphql");
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../util/validations.js");
const authCheck = require("../util/auth");
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
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getPosts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args) {
        try {
          const posts = await Post.find().sort({ createdAt: -1 });
          return posts;
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    getPost: {
      type: PostType,
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { postId } = args;
        try {
          const post = await Post.findById(postId);
          if (post) return post;
          else throw new Error("Post not found");
        } catch (err) {
          throw new Error(err);
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          const { username, email, password, confirmPassword } = args;

          const { valid, errors } = validateUserRegistration(
            username,
            email,
            password,
            confirmPassword
          );

          if (!valid) {
            throw new Error("Errors", { errors });
          }

          const existingUser = await User.findOne({
            $or: [{ username }, { email }],
          });
          if (existingUser) {
            throw new Error("User already exists!");
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = new User({
            email,
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          });
          await user.save();
          const token = jwt.sign({ id: user.id }, "mysecret");
          return { token, id: user._id, ...user._doc };
        } catch (err) {
          throw err;
        }
      },
    },
    login: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { username, password } = args;
        const { errors, valid } = validateUserLogin(username, password);
        if (!valid) {
          throw new Error("Errors", { errors });
        }
        const user = await User.findOne({ username });

        if (!user) {
          errors.general = "User not found";
          throw new Error("User not found", { errors });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          errors.general = "Wrong Credentials";
          throw new Error("Wrong Credentials", { errors });
        }

        const token = jwt.sign({ id: user.id }, "mysecret");
        return { token, id: user._id, ...user._doc };
      },
    },
    createPost: {
      type: PostType,
      args: { body: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parent, { body }, context) {
        const { id } = authCheck(context);
        const user = await User.findById(id);
        console.log(user);
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        const post = await newPost.save();
        return post;
      },
    },

    deletePost: {
      type: GraphQLString,
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, context) {
        const { postId } = args;
        const { id } = authCheck(context);
        const user = await User.findById(id);
        try {
          const post = await Post.findById(postId);
          if (user.username === post.username) {
            await Post.findByIdAndRemove(postId);
            return "Post Deleted";
          } else return "Action not allowed";
        } catch (err) {
          return `${err}`;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
