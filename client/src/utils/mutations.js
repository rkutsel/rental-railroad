import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $aboutMe: String
    $isLender: Boolean
    $isBorrower: Boolean
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      aboutMe: $aboutMe
      isLender: $isLender
      isBorrower: $isBorrower
    )
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($rentedProduct: [ID]!) {
    addOrder(rentedProduct: $rentedProduct) {
      OrderDate
      rentalStartDate
      rentalEndDate
      rentedProduct {
        _id
        name
        pricePerDay
      }
      rentedUser {
        _id
      }
      cost
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addCommentToProduct($productId: ID!, $comment: String!) {
    addCommentToProduct(productId: $productId, comment: $comment) {
      _id
      name
      description
      isRented
      image
      pricePerDay
      category
      comments {
        _id
        comment
        createdAt
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $pricePerDay: Float!
    $image: String!
    $category: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      image: $image
      pricePerDay: $pricePerDay
      category: $category
    ) {
      _id
      name
      description
      pricePerDay
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($_id: ID!, $pricePerDay: Int!) {
    updateProduct(_id: $_id, pricePerDay: $pricePerDay) {
      _id
      name
      description
      isRented
      image
      pricePerDay
      category
      comments {
        _id
        comment
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation addToMyWishlist($productId: ID!) {
    addToMyWishlist(productId: $productId) {
      _id
      firstName
      lastName
      email
      aboutMe
      rentals
      wishlist {
        _id
      }
      isLender
      isBorrower
      orders
      addresses
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;
