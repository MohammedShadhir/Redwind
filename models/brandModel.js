const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 30, // Optional: Restrict name length
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Optional: Restrict description length
    },
    logo_url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          // Basic URL validation
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", brandSchema);
