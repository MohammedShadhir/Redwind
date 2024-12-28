const stock = require("../models/stocksModel");

// Create a new stock

const createStock = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const stock = new Stock({
      product,
      quantity,
    });
    const createdStock = await stock.save();
    res.status(201).json({ success: true, data: createdStock });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all stocks

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate("product");
    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single stock by ID

const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id).populate("product");
    if (!stock)
      return res
        .status(404)
        .json({ success: false, message: "Stock not found" });
    res.status(200).json({ success: true, data: stock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a stock by ID

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, quantity } = req.body;
    const stock = await Stock.findById(id);
    if (!stock)
      return res
        .status(404)
        .json({ success: false, message: "Stock not found" });
    stock.product = product;
    stock.quantity = quantity;
    const updatedStock = await stock.save();
    res.status(200).json({ success: true, data: updatedStock });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a stock by ID

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);
    if (!stock)
      return res
        .status(404)
        .json({ success: false, message: "Stock not found" });
    await stock.remove();
    res.status(200).json({ success: true, message: "Stock has been deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
};
