const express = require("express");
const {
  createCustomer,
  loginCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

// Route to create a new customer profile
router.post("/register", createCustomer);

// Route to log in a customer by phone number
router.post("/login", loginCustomer);

// Fetch all customers
router.get("/read", getCustomers);

// Route to update a customer by ID
router.put("/update/:id", updateCustomer);

// Route to delete a customer by ID
router.delete("/delete/:id", deleteCustomer);

module.exports = router;
