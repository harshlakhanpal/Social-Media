import { gql } from "apollo-boost";

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

export { login, register };
