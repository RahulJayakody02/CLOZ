import React, { useState, useEffect } from "react";
import { getSales, createSale } from "../api"; // ✅ Import the correct function
import SalesForm from "../components/SalesForm";
import SalesTable from "../components/SalesTable";

import "../css/SalesPage.css";

const SalesPage = () => {
  const [sales, setSales] = useState([]);

  // ✅ Fix: Use the correct function name "getSales" instead of "fetchSales"
  const loadSales = async () => {
    const data = await getSales(); // 🔥 Use "getSales" instead of "fetchSales"
    setSales(data);
  };

  const handleAddSale = async (newSale) => {
    await createSale(newSale);
    await loadSales(); // Refresh list after adding a sale
  };

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <div className="container">
      <h1>CLOZ - Sales Management</h1>
      <SalesForm onSaleAdded={handleAddSale} />
      <SalesTable sales={sales} onSaleDeleted={loadSales} />
    </div>
  );
};

export default SalesPage;