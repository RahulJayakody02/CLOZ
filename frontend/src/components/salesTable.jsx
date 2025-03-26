import React, { useState } from "react";
import { deleteSale, updateSale } from "../api";

const SalesTable = ({ sales, onSaleDeleted, onEditSale }) => {
  const [editingSale, setEditingSale] = useState(null); // Track the sale being edited
  const [updatedData, setUpdatedData] = useState({}); // Track updated data for the sale

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sale?");
    if (!confirmDelete) return;

    await deleteSale(id);
    onSaleDeleted();
  };

  const handleEditClick = (sale) => {
    setEditingSale(sale); // Set the sale being edited
    setUpdatedData({ ...sale }); // Pre-fill the form with the current sale data
  };

  const handleUpdate = async () => {
    if (!editingSale) return;

    await updateSale(editingSale._id, updatedData);
    onEditSale();
    setEditingSale(null); // Close the edit form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Sales List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.customerName}</td>
              <td>
                <ul>
                  {sale.products.map((product, index) => (
                    <li key={index}>
                      {product.product} - {product.quantity} x ${product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${sale.totalPrice}</td>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEditClick(sale)}>Edit</button>
                <button onClick={() => handleDelete(sale._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSale && (
        <div>
          <h3>Edit Sale</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label>
              Customer Name:
              <input
                type="text"
                name="customerName"
                value={updatedData.customerName || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Total Price:
              <input
                type="number"
                name="totalPrice"
                value={updatedData.totalPrice || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingSale(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SalesTable;