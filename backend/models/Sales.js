const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  products: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Sale", SaleSchema);
