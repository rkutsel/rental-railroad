const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const orderSchema = require("./Order");
const addressSchema = require("./Address");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: false,
      // trim: true
    },
    aboutMe: {
      type: String,
      required: false,
    },
    rentals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isLender: {
      type: Boolean,
      required: true,
    },
    isBorrower: {
      type: Boolean,
      required: true,
    },
    orders: [orderSchema],
    addresses: [addressSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
