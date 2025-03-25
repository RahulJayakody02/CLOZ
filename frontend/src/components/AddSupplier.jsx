import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddSupplier = () => {
  const [supplier, setSupplier] = useState({ name: "", email: "", phone: "", company: "", address: "" });

  const handleChange = (e) => setSupplier({ ...supplier, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8070/supplier/add", supplier);
      toast.success("Supplier added successfully!");
    } catch (error) {
      toast.error("Failed to add supplier");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="form-control mb-2" />
        <input name="company" placeholder="Company" onChange={handleChange} className="form-control mb-2" />
        <input name="brand" placeholder="Brand" onChange={handleChange} className="form-control mb-2" />
        <input name="password" placeholder="password" onChange={handleChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;
