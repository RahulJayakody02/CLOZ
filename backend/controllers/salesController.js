const Sale = require("../models/Sales");

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const { customerName, products, date } = req.body;
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const newSale = new Sale({ customerName, products, totalPrice, date });
    await newSale.save();

    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: "Error creating sale" });
  }
};

// Get all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const { customerName, products, date } = req.body;
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, 
      { customerName, products, totalPrice, date },
      { new: true }
    );

    if (!updatedSale) return res.status(404).json({ error: "Sale not found" });

    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: "Error updating sale" });
  }
};


// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) return res.status(404).json({ error: "Sale not found" });

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sale" });
  }
};

exports.getSaleById = async (req, res) => {
    try {
      const sale = await Sale.findById(req.params.id);
      if (!sale) return res.status(404).json({ error: "Sale not found" });
      res.status(200).json(sale);
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale by ID" });
    }
  };