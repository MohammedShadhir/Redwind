const express = require("express");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const router = express.Router();

// CRUD routes
router.post("/", createBrand); // Create a brand
router.get("/", getAllBrands); // Get all brands
router.get("/:id", getBrandById); // Get a brand by ID
router.put("/:id", updateBrand); // Update a brand by ID
router.delete("/:id", deleteBrand); // Delete a brand by ID

module.exports = router;
