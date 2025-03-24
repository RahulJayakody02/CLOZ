import React, { useEffect, useState } from "react";
import axios from "axios";

const DiscountInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDiscount, setEditingDiscount] = useState(null); // Track the discount being edited
  const [newDiscount, setNewDiscount] = useState(""); // Track the new discount value

  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8070/order/allorders"); // Replace with your API endpoint
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add or update a discount
  const handleSaveDiscount = async (orderId) => {
    try {
      await axios.put(`http://localhost:8070/discount/update/${orderId}`, {
        discount: newDiscount,
      });
      setEditingDiscount(null); // Exit editing mode
      setNewDiscount(""); // Reset input
      fetchInventory(); // Refresh inventory
    } catch (error) {
      console.error("Error saving discount:", error);
    }
  };

  // Delete a discount
  const handleDeleteDiscount = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8070/discount/delete/${orderId}`);
      fetchInventory(); // Refresh inventory
    } catch (error) {
      console.error("Error deleting discount:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#333" }}>
        Inventory Discount Management
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.product?.name || "N/A"}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {editingDiscount === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        value={newDiscount}
                        onChange={(e) => setNewDiscount(e.target.value)}
                        placeholder="Enter discount"
                      />
                    ) : (
                      item.discount || "No Discount"
                    )}
                  </td>
                  <td>
                    {editingDiscount === item._id ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleSaveDiscount(item._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setEditingDiscount(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => {
                            setEditingDiscount(item._id);
                            setNewDiscount(item.discount || ""); // Pre-fill with existing discount
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteDiscount(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DiscountInventory;