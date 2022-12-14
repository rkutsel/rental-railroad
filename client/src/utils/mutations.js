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
  mutation addCommentToProduct($productId: ID!, $commentText: String!) {
    addCommentToProduct(productId: $productId, comment: $commentText) {
      _id
      name
      description
      isRented
      image
      pricePerDay
      category {
        name
      }
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
  mutation UpdateProduct($_id: ID!, $isRented: Boolean!) {
    updateProduct(_id: $_id, isRented: $isRented) {
      _id
      isRented
    }
  }
`;

export const REMOVE_PRODUCT = gql`
mutation removeProduct($productId: ID!) {
  removeProduct(productId: $productId) {
    firstName
    lastName
    email
    aboutMe
    isLender
    isBorrower
    rentals {
      _id
      name
      description
      isRented
      pricePerDay
      image
    }
    wishlist {
      _id
      name
      description
      isRented
      pricePerDay
      image
    }
    orders {
      _id
      OrderDate
      rentalStartDate
      rentalEndDate
      cost
      rentedProduct {
        _id
        name
        pricePerDay
      }
      rentedUser {
        firstName
        lastName
      }
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
      rentals {
        _id
      }
      wishlist {
        _id
      }
      isLender
      isBorrower
      orders {
        _id
      }
      addresses {
        _id
      }
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
