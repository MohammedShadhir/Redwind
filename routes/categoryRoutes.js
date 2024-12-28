const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// CRUD routes
router.post("/", createCategory); // Create a category
router.get("/", getAllCategories); // Get all categories
router.get("/:id", getCategoryById); // Get a category by ID
router.put("/:id", updateCategory); // Update a category by ID
router.delete("/:id", deleteCategory); // Delete a category by ID

module.exports = router;
