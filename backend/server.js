/*const express = require('express');
const Sale = require('../models/Sale');
const router = express.Router();
const saleRoutes = require('./routes/saleRoutes');  // Adjust path as necessary
app.use('/api/sale', saleRoutes);


// Get all sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a sale
router.post('/', async (req, res) => {
    const { itemName, quantity, price, customerName } = req.body;
    const sale = new Sale({ itemName, quantity, price, customerName });
    try {
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a sale
router.delete('/:id', async (req, res) => {
    try {
        await Sale.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sale deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; */

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection success!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Routes
const salesRoutes = require("./routes/salesRoutes");
app.use("/api/sales", salesRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

