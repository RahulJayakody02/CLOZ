const Supplier = require('../models/supplier_model'); 

// Add new supplier
const addSupplier = async (req, res) => {
  try {
    const {
      supplierId,
      name,
      email,
      phone,
      address,
      company,
      password, 
      status
    } = req.body;

    // Check if supplier with same email or ID already exists
    const existingSupplier = await Supplier.findOne({
      $or: [{ email: email }, { supplierId: supplierId }]
    });

    if (existingSupplier) {
      return res.status(400).json({ message: 'Supplier with given email or ID already exists.' });
    }

    // Create new supplier
    const newSupplier = new Supplier({
      supplierId,
      name,
      email,
      phone,
      address,
      company,
      password, // For production, hash this before saving
      status
    });

    // Save to DB
    await newSupplier.save();

    res.status(201).json({ message: 'Supplier added successfully', supplier: newSupplier });
  } catch (error) {
    console.error('Error adding supplier:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const getSuppliers = async (req, res) => {
  try {
      const suppliers = await Supplier.find();
      res.json(suppliers);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch suppliers", error: error.message });
  }
};

// Backend route to fetch a single supplier by objectid
const get= async (req, res) => {
  try {
    const supplier = await Supplier.findById({
       _id: req.params.supplierObjectId 
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Backend route to fetch a single supplier by supplierId
const getSupplier= async (req, res) => {
  try {
    const supplier = await Supplier.findOne({
      supplierId: req.params.supplierId
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addSupplier,getSuppliers,get,getSupplier };
