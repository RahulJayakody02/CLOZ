const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Customer's name
  email: { type: String, unique: true, required: true }, // Unique email
  phone: { type: String, unique: true, required: true }, // Unique phone number for login
  registrationDate: { type: Date, default: Date.now }, // Auto set current date
  loyaltyPoints: { type: Number, default: 0 }, // Start with 0 loyalty points
  purchaseHistory: [
    {
      productName: { type: String },
      purchaseDate: { type: Date, default: Date.now },
      amount: { type: Number },
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
