const router = require("express").Router();
const discountController = require("../controllers/discount_controller");

// Add a new discount
router.post("/add", discountController.addDiscount);

// Get all discounts
router.get("/", discountController.getDiscounts);

// Update discount
router.put("/update/:id", discountController.updateDiscount);

// Delete discount
router.delete("/delete/:id", discountController.deleteDiscount);

module.exports = router;
