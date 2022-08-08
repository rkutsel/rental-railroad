const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { populate } = require("../models/User");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");


const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    
    products: async (parent, args) => {
      const params = {};
      console.log(args)
      if (args.category) {
        return await Product.find({category: args.category}).populate("category");
      }

      if (args.name) {
        return await Product.find({name : args.name}).populate("category");
      }

      if (Object.keys(args).length === 0) 
      {
        return await Product.find().populate("category");
      };

      throw new AuthenticationError("Filter not Support");

    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id)
                      .populate("category")
                      .populate("comments");
    },

    me: async(parent, args, context) => {

      if (context.user) {
          return await User.findById(context.user._id)
                                  .populate({path: "rentals", select: ["name", "image", "isRented", "pricePerDay"]})
                                  .populate({path: "wishlist", select:["name", "image", "isRented", "pricePerDay"]})
                                  .populate({path:"orders", 
                                  populate:[{path:"rentedProduct"},{path: "rentedUser"},], 
                                  select:["OrderDate","rentalStartDate","cost","rentalEndDate",],},);
          }
          throw new AuthenticationError("Not logged in");
    },

    user: async (parent, args, context) => {        
        const user = await User.findById(args.userId)
                              .populate({path: "rentals", select: ["name", "image", "isRented", "pricePerDay"]})
                              .populate({path: "wishlist", select:["name", "image", "isRented", "pricePerDay"]})
                              .populate({path:"orders", 
                              populate:[{path:"rentedProduct"},{path: "rentedUser"},], 
                              select:["OrderDate","rentalStartDate","cost","rentalEndDate",],},);

        return user;
    },

    checkout: async (parent, args, context) => {
  
      const url = new URL(context.headers.referer).origin;
      const order = new Order(args);
      const line_items = [];

      const { rentedProduct } = await order.populate({path:"rentedProduct", select:["name"]});

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

    addCategory: async (parent, args) => {
      const category = await Category.create(args);
      return(category);
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addToMyWishlist: async (parent, { productId }, context) => {
      console.log(context);
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id}, 
          { $addToSet: { wishlist : productId } },
          {new: true});
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
        { $addToSet: { orders: order._id} },
         {new: true});

      return { User };
      }
      
      throw new AuthenticationError("Not logged in");
    },

    // Function to create product 
    addProduct: async (parent, args, context) => {
      if (context.user) {
      const addedProduct = await Product.create(args);
     
      return await User.findByIdAndUpdate(
        {_id: context.user._id}, 
        { $addToSet: { rentals : addedProduct._id } },
        {new: true});
     
   
      }
      throw new AuthenticationError("Not logged in");
    },

    // Function to update product 
    updateProduct: async(parent, { _id, pricePerDay }, context) => { 
      if (context.user) {
        return await Product.findByIdAndUpdate((_id), {pricePerDay: pricePerDay}, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    
    addCommentToProduct: async(parent, {productId, comment}, context) => {
      if (context.user) {
        return await Product.findByIdAndUpdate( 
          (productId),          
          {
          $addToSet: {
            comments: { comment: comment, author: context.user.firstName },
          },
        },
        {new: true});
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
