const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure a product can only be added once to a user's wishlist
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Index on userId for faster lookups
wishlistSchema.index({ userId: 1 });

module.exports = mongoose.model("Wishlist", wishlistSchema);
