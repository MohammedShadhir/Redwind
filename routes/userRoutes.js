const express = require("express");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// CRUD routes

router.post("/", createUser); // Create a user
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID

module.exports = router;
