import React, { useState } from "react";
import { getLoyaltyPoints } from "../services/api";

const LoyaltyPoints = () => {
  const [phone, setPhone] = useState("");
  const [points, setPoints] = useState(null);

  const fetchLoyaltyPoints = async () => {
    const data = await getLoyaltyPoints(phone);
    if (data) {
      setPoints(data.loyaltyPoints);
    }
  };

  return (
    <div className="card">
      <h2>Check Loyalty Points</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={fetchLoyaltyPoints}>Check Points</button>
      {points !== null && <h3>Loyalty Points: {points}</h3>}
    </div>
  );
};

export default LoyaltyPoints;
