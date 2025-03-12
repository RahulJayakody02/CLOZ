import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import NotificationBell from "./components/Productnotification";
import Sidebar from "./components/MainDashoardSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/MainDashboard";

const App = () => {
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]); // State to hold notifications

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8070/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Connect to Socket.IO server
  useEffect(() => {
    const socket = io("http://localhost:8070"); // Replace with your backend URL

    // Listen for low stock notifications
    socket.on("lowStockNotification", (data) => {
      // Add the new notification to the notifications state
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: data.message, seen: false },
      ]);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Mark notification as seen
  const markNotificationAsSeen = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, seen: true } : notification
      )
    );
  };

  return (
    <Router>
      <div className="d-flex">
        <Sidebar /> 
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/products/"
              element={
                <div className="container mt-4">
                 
                  {/* Notification Bell */}
                  <NotificationBell
                    notifications={notifications}
                    markNotificationAsSeen={markNotificationAsSeen}
                  />
                  <ProductList products={products} fetchProducts={fetchProducts} />
                </div>
              }
            />
            <Route
              path="/products/add"
              element={<AddProductForm fetchProducts={fetchProducts} />}
            />
            <Route
              path="/products/update/:productId"
              element={<UpdateProductForm fetchProducts={fetchProducts} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;