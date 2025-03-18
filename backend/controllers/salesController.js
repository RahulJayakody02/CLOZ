const Sales = require("../models/Sales");

// Create a new sale entry
exports.createSale = async (req, res) => {
    try {
        const { customerName, product, quantity, price, discount } = req.body;
        const totalPrice = quantity * price - discount;
        const sale = new Sales({ customerName, product, quantity, price, discount, totalPrice });

        await sale.save();
        res.status(201).json({ message: "Sale recorded successfully", sale });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get all sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get a single sale by ID
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) return res.status(404).json({ error: "Sale not found" });
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Update a sale
exports.updateSale = async (req, res) => {
    try {
        const { customerName, product, quantity, price, discount } = req.body;
        const totalPrice = quantity * price - discount;

        const sale = await Sales.findByIdAndUpdate(
            req.params.id,
            { customerName, product, quantity, price, discount, totalPrice },
            { new: true }
        );

        if (!sale) return res.status(404).json({ error: "Sale not found" });

        res.json({ message: "Sale updated successfully", sale });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
    try {
        const sale = await Sales.findByIdAndDelete(req.params.id);
        if (!sale) return res.status(404).json({ error: "Sale not found" });

        res.json({ message: "Sale deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
