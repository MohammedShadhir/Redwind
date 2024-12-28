const express = require("express");
const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItemController");

const router = express.Router();

// CRUD routes

router.post("/", createOrderItem); // Create an order item
router.get("/", getAllOrderItems); // Get all order items
router.get("/:id", getOrderItemById); // Get an order item by ID
router.put("/:id", updateOrderItem); // Update an order item by ID
router.delete("/:id", deleteOrderItem); // Delete an order item by ID

module.exports = router;
