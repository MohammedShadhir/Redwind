const rewiew = require("../models/reviewsmodel");

// Create a new review

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({
      rating,
      comment,
      user: req.user._id,
      product: req.params.productId,
    });
    const createdReview = await review.save();
    res.status(201).json({ success: true, data: createdReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all reviews

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single review by ID

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate("user", "name email");
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a review by ID

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findById(id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    review.rating = rating;
    review.comment = comment;
    const updatedReview = await review.save();
    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a review by ID

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    await review.remove();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
