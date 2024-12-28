const Brand = require("../models/brandModel");

// Create a new brand
const createBrand = async (req, res) => {
  try {
    const { name, description, logo_url } = req.body;
    const brand = new Brand({ name, description, logo_url });
    await brand.save();
    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single brand by ID
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a brand by ID
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, logo_url } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, description, logo_url },
      { new: true, runValidators: true } // Return updated doc & validate input
    );
    if (!updatedBrand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a brand by ID
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    res
      .status(200)
      .json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
