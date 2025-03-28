const express = require("express");
const router = express.Router();
const loyaltyController = require("../controllers/loyaltycontroller");

// Route to add a purchase and update loyalty points
router.post("/addPurchaseAndPoints", loyaltyController.addPurchaseAndPoints);

// Route to get a customer's loyalty points by phone number
router.get("/getLoyaltyPoints/:phone", loyaltyController.getLoyaltyPoints);

// Route to get a customer's purchase history by phone number
router.get("/getPurchaseHistory/:phone", loyaltyController.getPurchaseHistory);

module.exports = router;
