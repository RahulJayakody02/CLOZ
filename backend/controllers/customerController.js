const Customer = require("../models/customer");

// Create a new customer profile
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if customer with this email already exists
    const existingCustomerByEmail = await Customer.findOne({ email });
    if (existingCustomerByEmail) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists!" });
    }

    // Check if customer with this phone number already exists
    const existingCustomerByPhone = await Customer.findOne({ phone });
    if (existingCustomerByPhone) {
      return res
        .status(400)
        .json({ message: "Customer with this phone number already exists!" });
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

// Customer login by phone number
exports.loginCustomer = async (req, res) => {
  try {
    const { phone } = req.body;

    // Find customer by phone number
    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    // Return customer profile
    res.status(200).json({
      message: "Customer logged in successfully!",
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        loyaltyPoints: customer.loyaltyPoints,
        purchaseHistory: customer.purchaseHistory,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update (Edit) a customer profile
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(200).json({
      message: "Customer updated successfully!",
      customer: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a customer profile
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(200).json({ message: "delete sucess fully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
