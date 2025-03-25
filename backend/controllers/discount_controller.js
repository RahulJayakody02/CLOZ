const Discount = require("../models/discount_model");
const Product = require("../models/product_model");

// Add discount to a product
const addDiscount = async (req, res) => {
  try {
    const { productId, discountPercentage } = req.body;

    // Fetch the product details from the Product table
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Calculate discount and total price after discount
    const discountAmount = (product.price * discountPercentage) / 100;
    const totalPriceAfterDiscount = product.price - discountAmount;

    // Save discount details
    const discount = new Discount({
      productId: product._id,
      productName: product.name,
      quantity: product.quantityInStock,
      price: product.price,
      discountPercentage,
      discountAmount,
      totalPriceAfterDiscount,
    });

    await discount.save();
    res.status(201).json({ message: "Discount added successfully", discount });
  } catch (error) {
    res.status(500).json({ message: "Error adding discount", error: error.message });
  }
};

// Fetch all discounts
const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discounts", error: error.message });
  }
};

// Update a discount
const updateDiscount = async (req, res) => {
  try {
    const { discountPercentage } = req.body;
    const discountId = req.params.id;

    // Fetch the existing discount
    const discount = await Discount.findById(discountId);
    if (!discount) return res.status(404).json({ message: "Discount not found" });

    // Recalculate discount and total price
    const discountAmount = (discount.price * discountPercentage) / 100;
    const totalPriceAfterDiscount = discount.price - discountAmount;

    discount.discountPercentage = discountPercentage;
    discount.discountAmount = discountAmount;
    discount.totalPriceAfterDiscount = totalPriceAfterDiscount;

    await discount.save();
    res.json({ message: "Discount updated successfully", discount });
  } catch (error) {
    res.status(500).json({ message: "Error updating discount", error: error.message });
  }
};

// Delete a discount
const deleteDiscount = async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting discount", error: error.message });
  }
};

module.exports = {
  addDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
};
