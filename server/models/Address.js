const mongoose = require("mongoose");

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNum: {
      // In case house number contains a letter
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
