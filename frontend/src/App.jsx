import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesPage from "./pages/SalesPage";

import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesPage />} />
      </Routes>
    </Router>
  );
};

export default App;