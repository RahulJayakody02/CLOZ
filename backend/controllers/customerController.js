// controllers/customerController.js

const Customer = require("../models/customer");

// Create a new customer profile
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if customer with this email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists!" });
    }

    // Create and save the new customer
    const newCustomer = new Customer({ name, email, phone });
    await newCustomer.save();

    res.status(201).json({
      message: "Customer profile created successfully!",
      customer: newCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
