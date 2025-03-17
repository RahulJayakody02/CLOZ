const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Customer's name
  email: { type: String, unique: true, required: true }, // Unique email
  phone: { type: String, unique: true, required: true }, // Unique phone number for login
  registrationDate: { type: Date, default: Date.now }, // Auto set current date
  loyaltyPoints: { type: Number, default: 0 }, // Start with 0 loyalty points
  purchaseHistory: [
    // Track customer purchases
    {
      productName: { type: String }, // Name of the product
      purchaseDate: { type: Date, default: Date.now }, // Date of purchase
      amount: { type: Number }, // Purchase amount
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
