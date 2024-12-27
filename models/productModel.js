const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Limited Stock"],
      default: function () {
        return this.quantity > 0 ? "In Stock" : "Out of Stock";
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to update `stockStatus`
productSchema.pre("save", function (next) {
  this.stockStatus = this.quantity > 0 ? "In Stock" : "Out of Stock";
  next();
});

module.exports = mongoose.model("Product", productSchema);
