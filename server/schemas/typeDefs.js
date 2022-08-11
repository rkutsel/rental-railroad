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

  type Comment {
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
    pricePerDay: Float
    category: Category
    comments: [Comment]
  }

  type Order {
    _id: ID
    OrderDate: String
    rentalStartDate: String
    rentalEndDate: String
    rentedProduct: Product
    rentedUser: User
    cost: Float
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
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

  type fullName {
    _id: ID
    firstName: String
    lastName: String
  }

  scalar Upload

  type File {
    filename: String!
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
    category (categoryId: ID!) : Category
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user(userId: ID): User
    me: User
    fullname: fullName

    checkout(
      OrderDate: String!
      rentalStartDate: String!
      rentalEndDate: String!
      rentedProduct: ID!
      rentedUser: ID
      cost: Float!
    ): Checkout
  }

  type Mutation {
    addCategory(name: String!): Category

    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      aboutMe: String
      isLender: Boolean
      isBorrower: Boolean
    ): User

    login(email: String!, password: String!): Auth

    addToMyWishlist(productId: ID!): User

    addOrder(
      OrderDate: String!
      rentalStartDate: String!
      rentalEndDate: String!
      rentedProduct: ID!
      rentedUser: ID!
      cost: Float!
    ): Order

    addProduct(
      name: String!
      description: String!
      image: String
      pricePerDay: Float!
      category: ID!
    ): Product

    updateProduct(_id: ID!, pricePerDay: Int!): Product
    singleUpload(file: Upload!): Boolean!
    addCommentToProduct(productId: ID!, comment: String!): Product
  }
`;

module.exports = typeDefs;
