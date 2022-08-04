const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Address {
    _id: ID
    city: String
    state: String
    street: String
    houseNum: String
  }
 
  type Category {
    _id: ID
    name: String
  }

  type Comment: Comment {
    _id: ID
    author: String
    comment: String
    createdAt: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    isRented: Boolean
    image: String
    pricePerDay: Int
    category: Category
    comments: Comment
  }

  type Order {
    _id: ID
    OrderDate: String
    rentalStartDate: String
    rentalEndDate: String
    rentedProduct: Product
    rentedUser: User
    cost: Number
  }

  type User {
    _id: ID
    username: String
    name: String
    email: String
    password: String
    aboutMe: String
    rentals: [Product]
    wishlist: [Product]
    isLender: Boolean
    isBorrower: Boolean
    orders: [Order]
    addresses: [Address]
  }



  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
