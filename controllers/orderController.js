const order = require("../models/orderModel");

// Create a new order

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ success: false, message: "No order items" });
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json({ success: true, data: createdOrder });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single order by ID

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update an order by ID

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid, paidAt, isDelivered, deliveredAt } = req.body;
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = isPaid;
      order.paidAt = paidAt;
      order.isDelivered = isDelivered;
      order.deliveredAt = deliveredAt;
      const updatedOrder = await order.save();
      res.status(200).json({ success: true, data: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete an order by ID

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      await order.remove();
      res.status(200).json({ success: true, message: "Order removed" });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
