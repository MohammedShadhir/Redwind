const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// CRUD routes
router.post("/", createOrder); // Create an order
router.get("/", getAllOrders); // Get all orders
router.get("/:id", getOrderById); // Get an order by ID
router.put("/:id", updateOrder); // Update an order by ID
router.delete("/:id", deleteOrder); // Delete an order by ID

module.exports = router;
