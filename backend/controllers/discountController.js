const Discount = require("../models/discountModel");
const Sale = require("../models/Sales");

// Add a discount
exports.addDiscount = async (req, res) => {
  try {
    const { invoiceId, discountPercentage, description } = req.body;
    
    // Check if the invoice exists
    const sale = await Sale.findById(invoiceId);
    if (!sale) return res.status(404).json({ message: "Invoice not found" });

    const discount = new Discount({ invoiceId, discountPercentage, description });
    await discount.save();

    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all discounts
exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate("invoiceId");
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a discount
exports.updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { discountPercentage, description } = req.body;

    const updatedDiscount = await Discount.findByIdAndUpdate(
      id,
      { discountPercentage, description },
      { new: true }
    );

    if (!updatedDiscount) return res.status(404).json({ message: "Discount not found" });

    res.json(updatedDiscount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a discount
exports.deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDiscount = await Discount.findByIdAndDelete(id);

    if (!deletedDiscount) return res.status(404).json({ message: "Discount not found" });

    res.json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
