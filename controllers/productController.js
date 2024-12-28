const product = require("../models/productModel");

// Create a new product

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      imageUrl,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      imageUrl,
    });
    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product by ID

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      imageUrl,
    } = req.body;
    const product = await Product.findById(id);
    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.imageUrl = imageUrl;
      const updatedProduct = await product.save();
      res.status(200).json({ success: true, data: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a product by ID

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    await product.remove();
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
