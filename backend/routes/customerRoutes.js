// routes/customerRoutes.js

const express = require("express");
const { createCustomer } = require("../controllers/customerController");

const router = express.Router();

// Route to create a new customer profile
router.post("/", createCustomer);

module.exports = router;
