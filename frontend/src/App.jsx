import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import RegisterCustomer from "./Components/Registercustomer";
import CustomerList from "./Components/CustomerList";
import CustomerLogin from "./Components/CustomerLogin";
import CustomerProfile from "./Components/CustomerProfile";
import LoyaltyPoints from "./Components/LoyaltyPoints";
import AddPurchase from "./Components/AddPurchas";
import PurchaseHistory from "./Components/PurchaseHistory";
import MakePurchase from "./Components/MakePurchase";
import { useState } from "react";
import "./App.css";

function App() {
  const [customer, setCustomer] = useState(null);

  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> |{" "}
        <Link to="/customers">Customer List</Link> |{" "}
        <Link to="/login">Customer Login</Link> |{" "}
        {customer && (
          <>
            <Link to="/profile">Profile</Link> |{" "}
            <Link to="/make-purchase">Make Purchase</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<RegisterCustomer />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route
          path="/login"
          element={
            customer ? (
              <Navigate to="/profile" replace />
            ) : (
              <CustomerLogin setCustomer={setCustomer} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            customer ? (
              <CustomerProfile customer={customer} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/loyalty"
          element={
            customer ? (
              <LoyaltyPoints phone={customer.phone} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/add-purchase"
          element={
            customer ? (
              <AddPurchase phone={customer.phone} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/purchase-history"
          element={
            customer ? (
              <PurchaseHistory phone={customer.phone} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/make-purchase"
          element={
            customer ? (
              <MakePurchase customer={customer} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
