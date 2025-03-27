const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  registrationDate: { type: Date, default: Date.now },
  loyaltyPoints: { type: Number, default: 0 },
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
