import { useState } from "react";
import { addPurchase } from "../services/api";
import { Link } from "react-router-dom";

const CustomerProfile = ({ customer }) => {
  const [loyaltyPoints, setLoyaltyPoints] = useState(customer.loyaltyPoints); // Current loyalty points
  const [productName, setProductName] = useState(""); // Product name input
  const [amount, setAmount] = useState(""); // Amount input
  console.log(customer);

  // Handle purchase and update loyalty points
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
      <p>Loyalty Points: {customer.loyaltyPoints}</p>

      <Link to="/make-purchase">
        <button>Make a Purchase</button>
      </Link>

      <h3>Purchase History</h3>
      <ul>
        {customer.purchaseHistory.map((purchase, index) => (
          <li key={index}>
            {purchase.productName} - Rs.{purchase.amount} on{" "}
            {new Date(purchase.purchaseDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerProfile;
