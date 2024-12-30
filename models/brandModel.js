const mongoose = require("mongoose");

const urlValidator = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/i;

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true,
      maxlength: [30, "Name must be less than 30 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [100, "Description must be less than 100 characters"],
    },
    logo_url: {
      type: String,
      required: [true, "Logo URL is required"],
      trim: true,
      validate: {
        validator: (v) => urlValidator.test(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", brandSchema);
