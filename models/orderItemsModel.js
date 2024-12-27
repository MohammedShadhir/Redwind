const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (v) {
          return v === this.price * this.quantity;
        },
        message: "Total price must equal price multiplied by quantity.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderItem", orderItemsSchema);
