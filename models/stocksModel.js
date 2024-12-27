const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    color: {
      type: String,
      required: true,
      enum: ["Red", "Blue", "Green", "Black", "White"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.index({ productId: 1, size: 1, color: 1 }, { unique: true });

stockSchema.index({ productId: 1 });

module.exports = mongoose.model("Stock", stockSchema);
