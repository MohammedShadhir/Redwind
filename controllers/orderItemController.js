const orderItems = require("../models/orderItemsModel");

// Create a new order item

const createOrderItem = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const orderItem = new OrderItem({
      product,
      quantity,
    });
    const createdOrderItem = await orderItem.save();
    res.status(201).json({ success: true, data: createdOrderItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all order items

const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate("product");
    res.status(200).json({ success: true, data: orderItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single order item by ID

const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findById(id).populate("product");
    if (!orderItem)
      return res
        .status(404)
        .json({ success: false, message: "Order item not found" });
    res.status(200).json({ success: true, data: orderItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an order item by ID

const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, quantity } = req.body;
    const orderItem = await OrderItem.findById(id);
    if (!orderItem)
      return res
        .status(404)
        .json({ success: false, message: "Order item not found" });
    orderItem.product = product;
    orderItem.quantity = quantity;
    const updatedOrderItem = await orderItem.save();
    res.status(200).json({ success: true, data: updatedOrderItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order item by ID

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findById(id).populate("product");
    if (!orderItem)
      return res
        .status(404)
        .json({ success: false, message: "Order item not found" });
    await orderItem.remove();
    res.status(200).json({ success: true, message: "Order item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
