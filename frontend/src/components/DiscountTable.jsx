import { useEffect, useState } from "react";
import axios from "axios";

function DiscountTable() {
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountForm, setDiscountForm] = useState({
    discountPercentage: "",
    date: "",
  });

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch discounts from the backend
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/discounts/");
        const discountsData = response.data.reduce((acc, discount) => {
          acc[discount.productId] = {
            _id: discount._id, // Store the discount's ID
            discountPercentage: discount.discountPercentage,
            discountAmount: discount.discountAmount,
            totalPriceAfterDiscount: discount.totalPriceAfterDiscount,
            date: discount.date,
          };
          return acc;
        }, {});
        setDiscounts(discountsData);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };
  
    fetchDiscounts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Add or update discount
  const handleSubmitDiscount = async (productId) => {
    const { discountPercentage, date } = discountForm;
    const product = products.find((p) => p._id === productId);
    const discountAmount = (product.price * discountPercentage) / 100;
    const totalPriceAfterDiscount = product.price - discountAmount;

    try {
      const response = await axios.post("http://localhost:8070/api/discounts/add", {
        productId,
        productName: product.name,
        quantity: product.quantityInStock,
        price: product.price,
        discountPercentage,
        discountAmount,
        totalPriceAfterDiscount,
        date,
      });

      console.log("Discount saved:", response.data);

      // Update local state
      setDiscounts((prevDiscounts) => ({
        ...prevDiscounts,
        [productId]: {
          discountPercentage,
          discountAmount,
          totalPriceAfterDiscount,
          date,
        },
      }));

      setSelectedProduct(null); // Close the form
    } catch (error) {
      console.error("Error saving discount:", error);
    }
  };

// Delete discount
// Delete discount
const handleDeleteDiscount = async (productId) => {
  try {
    // Find the discount associated with the productId
    const discount = discounts[productId]; // Access the discount directly using productId as the key
    if (discount && discount._id) {
      const discountId = discount._id; // Get the discount's ID
      await axios.delete(`http://localhost:8070/api/discounts/delete/${discountId}`);
      console.log("Discount deleted");

      // Update local state
      setDiscounts((prevDiscounts) => {
        const updatedDiscounts = { ...prevDiscounts };
        delete updatedDiscounts[productId];
        return updatedDiscounts;
      });
    } else {
      console.error("No discount found for the given productId");
    }
  } catch (error) {
    console.error("Error deleting discount:", error);
  }
};

  return (
    <div>
      <h2>Product Discount Table</h2>
      {products.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount Percentage</th>
              <th>Discount Amount</th>
              <th>Total Price After Discount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const discount = discounts[product._id] || {};
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.quantityInStock}</td>
                  <td>{product.price}</td>
                  <td>{discount.discountPercentage || 0}%</td>
                  <td>{discount.discountAmount || 0}</td>
                  <td>{discount.totalPriceAfterDiscount || product.price}</td>
                  <td>{discount.date ? new Date(discount.date).toLocaleDateString() : "N/A"}</td>
                  <td>
                    <button onClick={() => setSelectedProduct(product)}>
                      {discount.discountPercentage ? "Update" : "Add"} Discount
                    </button>
                    {discount.discountPercentage > 0 && (
                      <button onClick={() => handleDeleteDiscount(product._id)}>
                        Delete Discount
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}

      {/* Discount Form */}
      {selectedProduct && (
        <div>
          <h3>
            {discounts[selectedProduct._id]
              ? "Update"
              : "Add"} Discount for {selectedProduct.name}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitDiscount(selectedProduct._id);
            }}
          >
            <label>
              Discount Percentage:
              <input
                type="number"
                name="discountPercentage"
                value={discountForm.discountPercentage}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={discountForm.date}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setSelectedProduct(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DiscountTable;