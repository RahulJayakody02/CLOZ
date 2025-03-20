import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Container, Spinner, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/supplierprofile.css";
import { toast } from "react-toastify";

const SupplierProfile = () => {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/supplier/supplierprofile/${supplierId}`);
        setSupplier(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch supplier data.");
        setLoading(false);
        console.error("Error fetching supplier:", err);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/order/supplier/${supplierId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [supplierId]);

  const handleOrderAction = async (orderId, action) => {
    try {
      await axios.put(`http://localhost:8070/order/update/${orderId}`, { status: action });
      toast.success(`Order ${action}`);
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: action } : o));
    } catch (err) {
      setError("Failed to update order.");
      console.error("Error updating order:", err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!supplier) {
    return (
      <Container className="text-center mt-5">
        <p>Supplier not found.</p>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-5">
        <Card className="profile-card">
          <Card.Header className="profile-header bg-primary text-white">
            <h2>Supplier Profile</h2>
          </Card.Header>
          <Card.Body className="profile-body">
            <p><strong>Supplier ID:</strong> {supplier.supplierId}</p>
            <p><strong>Name:</strong> {supplier.name}</p>
            <p><strong>Email:</strong> {supplier.email}</p>
            <p><strong>Phone:</strong> {supplier.phone}</p>
            <p><strong>Address:</strong> {supplier.address}</p>
            <p><strong>Company:</strong> {supplier.company}</p>
            <p><strong>Status:</strong> <span className={supplier.status === "Active" ? "status-active" : "status-inactive"}>{supplier.status}</span></p>
            <p><strong>Created At:</strong> {new Date(supplier.createdAt).toLocaleString()}</p>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-4">
        <h2>Orders</h2>
        {orders.length === 0 ? <p>No orders found.</p> : orders.map((order) => (
          <Card key={order._id} className="mb-3">
            <Card.Body>
              <h5>Product: {order.product.name}</h5>
              <p>Color:{order.product.color}</p>
              <p>Gender:{order.product.gender}</p>
              <p>Material:{order.product.material}</p>
              <p>Size:{order.product.size}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Status: {order.status}</p>
              {order.status === 'Pending' && (
                <div>
                  <Button variant="success" onClick={() => handleOrderAction(order._id, 'Accepted')} className="me-2">Accept</Button>
                  <Button variant="danger" onClick={() => handleOrderAction(order._id, 'Rejected')}>Reject</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default SupplierProfile;
