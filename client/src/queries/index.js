import { gql } from "apollo-boost";

const login = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      token
      _id
    }
  }
`;

const getProductsByCategory = gql`
  query($category: String!) {
    productsByCategory(category: $category) {
      name
      quantity
      cost
    }
  }
`;

const register = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
      token
      _id
    }
  }
`;

const getUser = gql`
  query($id: ID!) {
    user(id: $id) {
      name
      _id
      email
      token
    }
  }
`;

export { login, getUser, register, getProductsByCategory };
