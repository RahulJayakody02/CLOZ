import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterCustomer from "./Components/Registercustomer";
import CustomerList from "./Components/CustomerList";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> |{" "}
        <Link to="/customers">Customer List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RegisterCustomer />} />
        <Route path="/customers" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;
