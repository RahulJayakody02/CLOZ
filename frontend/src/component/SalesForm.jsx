import React, { useState } from "react";
import { createSale } from "../api";

const SalesForm = ({ onSaleAdded }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    products: [{ product: "", quantity: 1, price: 0 }],
    date: "",
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedProducts = [...formData.products];
      updatedProducts[index][name] = value;
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { product: "", quantity: 1, price: 0 }],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const calculateTotalPrice = () => {
    return formData.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();
    await createSale({ ...formData, totalPrice });
    onSaleAdded();

    setFormData({
      customerName: "",
      products: [{ product: "", quantity: 1, price: 0 }],
      date: "",
    });
  };

  return (
    <div>
      <h2>Add Sale</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        {formData.products.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="product"
              placeholder="Product"
              value={item.product}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleChange(e, index)}
              required
            />
            {formData.products.length > 1 && (
              <button type="button" onClick={() => removeProduct(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addProduct}>Add Product</button>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <h3>Total Price: {calculateTotalPrice()}</h3>
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
};

export default SalesForm;
