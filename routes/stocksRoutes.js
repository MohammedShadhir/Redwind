const express = require("express");

const {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

const router = express.Router();

// CRUD routes

router.post("/", createStock); // Create a stock
router.get("/", getAllStocks); // Get all stocks
router.get("/:id", getStockById); // Get a stock by ID
router.put("/:id", updateStock); // Update a stock by ID
router.delete("/:id", deleteStock); // Delete a stock by ID

module.exports = router;
