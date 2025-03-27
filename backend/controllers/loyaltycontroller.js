const Customer = require("../models/customer");

// Add a purchase and update loyalty points
exports.addPurchaseAndPoints = async (req, res) => {
  try {
    const { phone, productName, amount } = req.body;

    // Find the customer using phone number
    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    // Loyalty points calculation (Example: 1 point per $10 spent)
    const pointsEarned = Math.floor(amount / 100);

    //Create a new purchase entry
    const newPurchase = {
      productName,
      amount,
    };

    // Add purchase to history and update loyalty points
    customer.purchaseHistory.push(newPurchase);
    customer.loyaltyPoints += pointsEarned;

    // Save updated customer data
    await customer.save();

    res.status(201).json({
      message: "Purchase recorded, loyalty points updated!",
      customer: {
        name: customer.name,
        phone: customer.phone,
        loyaltyPoints: customer.loyaltyPoints,
        purchaseHistory: customer.purchaseHistory,
      },
      pointsEarned,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get customer loyalty points using phone number
exports.getLoyaltyPoints = async (req, res) => {
  try {
    const { phone } = req.params;

    // Find the customer by phone
    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(200).json({
      message: "Loyalty points fetched successfully!",
      name: customer.name,
      phone: customer.phone,
      loyaltyPoints: customer.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch all purchase history of a customer by phone number
exports.getPurchaseHistory = async (req, res) => {
  try {
    const { phone } = req.params;

    // Find the customer by phone number
    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(200).json({
      message: "Purchase history fetched successfully!",
      name: customer.name,
      phone: customer.phone,
      purchaseHistory: customer.purchaseHistory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
