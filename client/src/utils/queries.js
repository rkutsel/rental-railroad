import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      isRented
      pricePerDay
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      isRented
      pricePerDay
      image
      category {
        name
      }
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query singleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      description
      isRented
      pricePerDay
      image
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      aboutMe
      isLender
      isBorrower
      orders {
        _id
        OrderDate
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
