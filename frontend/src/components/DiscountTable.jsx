import { useEffect, useState } from "react";

function DiscountTable() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8070/discounts") // Fetch data from backend
      .then((response) => response.json())
      .then((data) => setDiscounts(data))
      .catch((error) => console.error("Error fetching discounts:", error));
  }, []);

  return (
    <div>
      <h2>Discount Table</h2>
      {discounts.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount._id}>
                <td>{discount._id}</td>
                <td>{discount.value}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No discounts available.</p>
      )}
    </div>
  );
}

export default DiscountTable;
