import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";
import ProductList from "./components/ProductList";
import "./css/inventorydashboard.css";

const App = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Connect to Socket.IO server
  useEffect(() => {
    const socket = io("http://localhost:8070"); // Replace with your backend URL

    // Listen for low stock notifications
    socket.on("lowStockNotification", (data) => {
      toast.warning(data.message); // Display notification as a toast
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="dashboard">
      <h1>Inventory Dashboard</h1>
      <ProductList products={products} />
    </div>
  );
};

export default App;