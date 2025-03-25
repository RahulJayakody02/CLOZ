const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connection success!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// Routes
//const discountRoutes = require("./routes/discount_route");
const salesRoutes = require("./routes/salesRoutes");

//app.use("/api/discounts", discountRoutes);
app.use("/api/sales", salesRoutes);

// Fallback Route for Undefined Endpoints
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await mongoose.connection.close();
    process.exit(0);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});