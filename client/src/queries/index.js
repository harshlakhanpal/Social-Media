import { gql } from "apollo-boost";

const getPosts = gql`
  query {
    getPosts {
      username
      body
      id
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
      }
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
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
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
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

const createComment = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      username
      body
      id
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

const deleteComment = gql`
  mutation($postId: ID!, $commentID: ID!) {
    deleteComment(postId: $postId, commentID: $commentID) {
      username
      body
      id
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

const likePost = gql`
  mutation($postId: ID!) {
    likePost(postId: $postId) {
      username
      body
      id
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

const deletePost = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
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

export {
  login,
  register,
  getPosts,
  getPost,
  createPost,
  deletePost,
  createComment,
  deleteComment,
  likePost,
};
