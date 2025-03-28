// api.jsx
import axios from "axios";

const API_URL = "http://localhost:8070/api/loyalty"; // Adjust as needed

// Function to update loyalty points when a customer makes a purchase
/*export const addPurchase = async (phone, productName, amount) => {
  try {
    const response = await axios.post(`${API_URL}/addPurchaseAndPoints`, {
      productName,
      amount,
    });
    return response.data.updatedLoyaltyPoints;
  } catch (error) {
    console.error("Error updating loyalty points:", error);
    throw error;
  }
};*/

export const addPurchase = async (phone, productName, amount) => {
  try {
    const response = await axios.post(`${API_URL}/addPurchaseAndPoints`, {
      phone,
      productName,
      amount,
    });
    return response.data.updatedLoyaltyPoints;
  } catch (error) {
    console.error(
      "Error updating loyalty points:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Function to get loyalty points for a customer
export const getLoyaltyPoints = async (phone) => {
  try {
    const response = await axios.get(
      `http://localhost:8070/api/loyalty/${phone}/getLoyaltyPoints`
    );
    return response.data; // Ensure the API response has loyaltyPoints
  } catch (error) {
    console.error("Error fetching loyalty points:", error);
    throw error;
  }
};

export const getPurchaseHistory = async (phone) => {
  try {
    const response = await fetch(
      `http://localhost:8070/api/loyalty/${phone}/getPurchaseHistory`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch purchase history");
    }
    const data = await response.json();
    return data; // Ensure data is returned
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return null;
  }
};
