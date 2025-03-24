const express = require("express");
const router = express.Router();
const { addDiscount, getDiscounts, updateDiscount, deleteDiscount } = require("../controllers/discountController");

router.post("/", addDiscount);  // Add a discount
router.get("/", getDiscounts);  // Fetch all discounts
router.put("/:id", updateDiscount);  // Update a discount
router.delete("/:id", deleteDiscount);  // Delete a discount

module.exports = router;
