const express = require("express");

const {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

// CRUD routes

router.post("/", createWishlist); // Create a wishlist
router.get("/", getAllWishlists); // Get all wishlists
router.get("/:id", getWishlistById); // Get a wishlist by ID
router.put("/:id", updateWishlist); // Update a wishlist by ID
router.delete("/:id", deleteWishlist); // Delete a wishlist by ID

module.exports = router;
