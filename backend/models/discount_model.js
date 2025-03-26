const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  totalPriceAfterDiscount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;
