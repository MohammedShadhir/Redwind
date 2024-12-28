const express = require("express");

const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

// CRUD routes

router.post("/", createReview); // Create a review
router.get("/", getAllReviews); // Get all reviews
router.get("/:id", getReviewById); // Get a review by ID
router.put("/:id", updateReview); // Update a review by ID
router.delete("/:id", deleteReview); // Delete a review by ID

module.exports = router;
