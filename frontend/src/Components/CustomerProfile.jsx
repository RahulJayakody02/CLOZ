/*import React from "react";

const CustomerProfile = ({ customer }) => {
  return (
    <div>
      <h2>Customer Profile</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Loyalty Points: {customer.loyaltyPoints}</p>
      <p>Purchase History:</p>
      <ul>
        {customer.purchaseHistory.map((purchase, index) => (
          <li key={index}>
            {purchase.item} - ${purchase.amount} on {purchase.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerProfile;*/

import { useState } from "react";
import { addPurchase } from "../services/api"; // Importing the function to handle API calls

const CustomerProfile = ({ customer }) => {
  const [loyaltyPoints, setLoyaltyPoints] = useState(customer.loyaltyPoints); // Current loyalty points
  const [productName, setProductName] = useState(""); // Product name input
  const [amount, setAmount] = useState(""); // Amount input

  // Handle purchase and update loyalty points
  /*const handlePurchase = async () => {
    try {
      // Call API to add loyalty points based on purchase details
      const updatedLoyaltyPoints = await addPurchase(
        customer.phone,
        productName,
        amount
      );

      // Update local loyalty points state with the new value
      setLoyaltyPoints(updatedLoyaltyPoints);

      alert("Purchase successful! Loyalty points updated.");
    } catch (error) {
      console.error("Error updating loyalty points:", error);
      alert("Failed to update loyalty points.");
    }
  };*/

  const handlePurchase = async () => {
    try {
      const updatedLoyaltyPoints = await addPurchase(
        customer.phone,
        productName,
        amount
      );

      setLoyaltyPoints(updatedLoyaltyPoints);
      alert("Purchase successful! Loyalty points updated.");
    } catch (error) {
      console.error(
        "Error updating loyalty points:",
        error.response?.data || error.message
      );
      alert(
        `Failed to update loyalty points: ${
          error.response?.data?.error || "Server error"
        }`
      );
    }
  };

  return (
    <div>
      <h2>Customer Profile</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Loyalty Points: {loyaltyPoints}</p>

      {/* Input fields for making a purchase */}
      <h3>Make a Purchase</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)} // Update product name state
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Update amount state
      />
      <button onClick={handlePurchase}>Add Purchase</button>

      <h3>Purchase History</h3>
      <ul>
        {customer.purchaseHistory.map((purchase, index) => (
          <li key={index}>
            {purchase.productName} - ${purchase.amount} on{" "}
            {new Date(purchase.purchaseDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerProfile;
