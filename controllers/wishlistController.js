const wishlist = require("../models/wishlistModel");

// Create a new wishlist

const createWishlist = async (req, res) => {
  try {
    const { product } = req.body;
    const wishlist = new Wishlist({
      product,
    });
    const createdWishlist = await wishlist.save();
    res.status(201).json({ success: true, data: createdWishlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all wishlists

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find().populate("product");
    res.status(200).json({ success: true, data: wishlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single wishlist by ID

const getWishlistById = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findById(id).populate("product");
    if (!wishlist)
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a wishlist by ID

const updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;
    const wishlist = await Wishlist.findById(id);
    if (!wishlist)
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    wishlist.product = product;
    const updatedWishlist = await wishlist.save();
    res.status(200).json({ success: true, data: updatedWishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findById;
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }
    await wishlist.remove();
    res.status(200).json({ success: true, message: "Wishlist deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
};
