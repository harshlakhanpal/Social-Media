import { gql } from "apollo-boost";

const getPosts = gql`
  query {
    getPosts {
      username
      body
      id
      createdAt
    }
  }
`;

const getPost = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      username
      body
      id
      createdAt
      comments {
        username
        body
      }
    }
  }
`;

const createPost = gql`
  mutation($body: String!) {
    createPost(body: $body) {
      username
      body
      id
      createdAt
    }
  }
`;

const login = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      token
      id
    }
  }
`;

const register = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      token
      id
      createdAt
    }
  }
`;

export { login, register, getPosts, getPost, createPost };
