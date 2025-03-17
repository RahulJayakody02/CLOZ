import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterCustomer from "./pages/RegisterCustomer";
import CustomerList from "./pages/CustomerList";

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
