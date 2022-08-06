const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");


const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate("category");
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
                              .populate({path: "rentals", select: ["title", "image", "isRented", "pricePerDay"]})
                              .populate({path: "wishlist", select:["title", "image", "isRented", "pricePerDay"]})
                              .populate("Orders");

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = await Order.create(args);
      const line_items = [];

      const { rentedProduct } = await order.populate("rentedProduct");

        const product = await stripe.products.create({
          name: rentedProduct.name,
          description: rentedProduct.description,
          images: [`${url}/images/${rentedProduct.image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: order.cost,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
    

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addToMyWishlist: async (parent, { productId }, context) => {
      console.log(context);
      if (context.user) {
        await User.findByIdAndUpdate(
          {_id: context.user._id}, 
          { $addToSet: { wishlist : productId } },
          {new: true});
  
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError("Not logged in");
    },
    
    // Function to create order 
    addOrder: async (parent, args, context) => {
      if (context.user) {
      const order = await Order.create(args);

      await User.findByIdAndUpdate(
        {_id:context.user._id}, 
        { $addToSet: { myOrders: orderId } },
         {new: true});

      return { User };
      }
      
      throw new AuthenticationError("Not logged in");
    },

    // Function to create product 
    addProduct: async (parent, {product}, context) => {
      if (context.user) {
      const addedProduct = await Product.create(product);
     
      await User.findByIdAndUpdate(
        {_id: context.user._id}, 
        { $addToSet: { rentals : addedProduct._id } },
        {new: true});
     
      return { User };
      }
      throw new AuthenticationError("Not logged in");
    },

    // Function to update product 
    updateProduct: async(parent, { _id, pricePerDay }, context) => { 
      if (context.user) {
        return await Product.findByOneAndUpdate({_id: product._id}, {pricePerDay: pricePerDay}, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    
    addCommentToProduct: async(parent, {productId, comment}, context) => {
      if (context.user) {
        return await Product.findByOneAndUpdate( {_id: productId},          
          {
          $addToSet: {
            comments: { comment, author: context.user.firstName },
          },
        }
        ,{new: true});
      }
      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
