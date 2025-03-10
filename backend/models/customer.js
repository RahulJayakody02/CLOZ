// models/customer.js

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }, // Auto set current date
  loyaltyPoints: { type: Number, default: 0 }, // Start with 0 loyalty points
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
