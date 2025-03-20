import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductList = ({ products, fetchProducts }) => {
  // Delete a product
  const handleDelete = async (productId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this product?");
  
      if (!isConfirmed) {
      return; // If user cancels, exit the function
  }
      await axios.delete(`http://localhost:8070/products/delete/${productId}`);
      toast.success("Product deleted successfully!");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
       <h1 className="text-center mb-4">Inventory Dashboard</h1>
      <h2 className="mb-4">Product List</h2>
      <Link to="/products/add" className="btn btn-primary mb-4">
        Add New Product
      </Link>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.quantityInStock}</td>
              <td>Rs{product.price}</td>
              <td>
                <Link
                  to={`/products/update/${product.productId}`}
                  className="btn btn-success btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.productId)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
                <Link
                  to={`/products/order/${product.productId}`}
                  className="btn btn-success btn-sm me-2"
                >
                  Order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;