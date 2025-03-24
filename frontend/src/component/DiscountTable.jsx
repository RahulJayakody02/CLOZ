import React from "react";
import { deleteDiscount } from "../api";

const DiscountTable = ({ discounts, onDiscountDeleted, onEditDiscount }) => {
  const handleDelete = async (id) => {
    await deleteDiscount(id);
    onDiscountDeleted();
  };

  return (
    <div>
      <h2>Discounts List</h2>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Discount Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => (
            <tr key={discount._id}>
              <td>{discount.invoiceId}</td>
              <td>${discount.discountAmount}</td>
              <td>{discount.description}</td>
              <td>
                <button onClick={() => onEditDiscount(discount)}>Edit</button>
                <button onClick={() => handleDelete(discount._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTable;
