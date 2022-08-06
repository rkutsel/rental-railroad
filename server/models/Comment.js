const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
<<<<<<< HEAD
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
=======
>>>>>>> develop
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      min: [1, "This field must be filled in!"],
      max: [280, "Your review is too long!"],
    },
    createdAt: {
      type: Date,
      required: true,
      get: (date) => {
        if (date) return date.toLocaleString().split("T")[0];
      },
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
