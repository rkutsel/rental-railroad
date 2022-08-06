const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the product comments
const commentSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
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

module.exports = commentSchema;
