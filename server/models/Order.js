const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  OrderDate: {
    type: Date,
    get: (date) => {
      if (date) return date.toLocaleString().split("T")[0];
    },
    default: Date.now,
  },
  rentalStartDate: {
    type: Date,
    get: (date) => {
      if (date) return date.toLocaleString().split("T")[0];
    },
    required: true,
    default: Date.now,
  },
  rentalEndDate: {
    type: Date,
    get: (date) => {
      if (date) return date.toLocaleString().split("T")[0];
    },
    required: true,
  },
  rentedProduct: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rentedUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
