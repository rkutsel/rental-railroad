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
                              .populate({path: "myRentals", select: ["title", "image", "isRented", "pricePerDay"]})
                              .populate({path: "myWishList", select:["title", "image", "isRented", "pricePerDay"]})
                              .populate("myOrders");

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("product");

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.product});
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

    addToMyOrders: async (parent, { orderId }, context) => {
      console.log(context);
      if (context.user) {

        await User.findByIdAndUpdate(context.user._id, { $push: { myOrders: orderId } }, {new: true});

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    
    addToMyRentals: async (parent, { productId }, context) => {
      console.log(context);
      if (context.user) {

        await User.findByIdAndUpdate(context.user._id, { $push: { myRentals : productId } },{new: true});
        
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    addToMyWishlist: async (parent, { productId }, context) => {
      console.log(context);
      if (context.user) {

        await User.findByIdAndUpdate(context.user._id, { $push: { myWishlist : productId } }, {new: true});
        
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
      return { order };
      }

      throw new AuthenticationError("Not logged in");
    },

    // Function to create product 
    addProduct: async (parent, {product}, context) => {
      if (context.user) {
      const addedProduct = await Product.create(product);
      return { addedProduct };
      }
      throw new AuthenticationError("Not logged in");
    },

    // Function to update product 
    updateProduct: (parent, {product}, context) => { 
      if (context.user) {
        return await Product.findByOneAndUpdate({_id: product._id}, product, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    
    addCommentToProduct: (parent, {productId, comment}, context) => {
      if (context.user) {
        return await Product.findByOneAndUpdate( {_id: productId}, { $push: { comments : comment } },{new: true});
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
