import React, { useState } from "react";
import { createDiscount, updateDiscount } from "../api";

const DiscountForm = ({ onDiscountAdded, editData }) => {
  const [formData, setFormData] = useState(
    editData || { invoiceId: "", discountAmount: "", description: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await updateDiscount(editData._id, formData);
    } else {
      await createDiscount(formData);
    }
    onDiscountAdded();
    setFormData({ invoiceId: "", discountAmount: "", description: "" });
  };

  return (
    <div>
      <h2>{editData ? "Edit Discount" : "Add Discount"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="invoiceId"
          placeholder="Invoice ID"
          value={formData.invoiceId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discountAmount"
          placeholder="Discount Amount"
          value={formData.discountAmount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{editData ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default DiscountForm;
