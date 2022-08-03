const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = require("./Comment");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      min: [1, "This field must be filled in!"],
      max: [280, "Your description is too long!"],
    },
    isRented: {
      type: Boolean,
      required: true,
    },
    // image: {
    //   type: String
    // },
    dailyPrice: {
      type: Number,
      required: true,
      min: 0.99,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    comments: {
      type: [commentSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
