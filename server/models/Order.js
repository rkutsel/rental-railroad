const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  OrderDate: {
    type: Date,
    default: Date.now,
  },
  rentalStartDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  rentalEndDate: {
    type: Date,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cost: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
