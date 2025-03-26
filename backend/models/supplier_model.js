const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  company: {
    type: String
  },
  password: { // if you want login functionality
    type: String,
    required: true
  },
  status: { // Active / Inactive
    type: String,
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
