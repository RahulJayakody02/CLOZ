const Supplier = require('../models/supplier_model'); // Adjust the path as necessary

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
      password, // Make sure to hash this in production
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

module.exports = { addSupplier };
