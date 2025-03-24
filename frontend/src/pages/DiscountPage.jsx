import React, { useState, useEffect } from "react";
import { fetchDiscounts } from "../api";
import DiscountForm from "../component/DiscountForm";
import DiscountTable from "../component/DiscountTable";

const DiscountPage = () => {
  const [discounts, setDiscounts] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadDiscounts = async () => {
    const data = await fetchDiscounts();
    setDiscounts(data);
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  return (
    <div className="container">
      <h1>CLOZ - Discount Management</h1>
      <DiscountForm onDiscountAdded={loadDiscounts} editData={editData} />
      <DiscountTable discounts={discounts} onDiscountDeleted={loadDiscounts} onEditDiscount={setEditData} />
    </div>
  );
};

export default DiscountPage;
