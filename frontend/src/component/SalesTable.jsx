import React from "react";
import { deleteSale } from "../api";

const SalesTable = ({ sales, onSaleDeleted, onEditSale }) => {
  const handleDelete = async (id) => {
    await deleteSale(id);
    onSaleDeleted();
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
                <button onClick={() => onEditSale(sale)}>Edit</button>
                <button onClick={() => handleDelete(sale._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
