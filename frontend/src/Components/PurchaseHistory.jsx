import React, { useState } from "react";
import { getPurchaseHistory } from "../services/api";

const PurchaseHistory = () => {
  const [phone, setPhone] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const data = await getPurchaseHistory(phone);
    if (data) {
      setHistory(data.purchaseHistory);
    }
  };

  return (
    <div className="card">
      <h2>Purchase History</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={fetchHistory}>View History</button>

      <ul>
        {history.map((purchase, index) => (
          <li key={index}>
            {purchase.productName} - ${purchase.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
