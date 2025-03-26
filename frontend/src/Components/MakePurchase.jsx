import { useState } from "react";
import { addPurchase } from "../services/api"; // Importing the function to handle API calls
import { useNavigate } from "react-router-dom";

const MakePurchase = ({ customer }) => {
  const [productName, setProductName] = useState(""); // Product name input
  const [amount, setAmount] = useState(""); // Amount input
  const navigate = useNavigate();

  const handlePurchase = async () => {
    try {
      const updatedLoyaltyPoints = await addPurchase(
        customer.phone,
        productName,
        amount
      );

      alert("Purchase successful! Loyalty points updated.");
      navigate(-1); // Navigate back to the previous page
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
    </div>
  );
};

export default MakePurchase;
