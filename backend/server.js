require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection (modern syntax)
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connection success!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('🔗 Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

global.io = io;

// 🔹 Import Routes
// const salesRoutes = require("./routes/salesRoutes");  // ✅ Added Sales Routes
// const returnRoutes = require("./routes/returnsRoutes"); // Commented out as the file is missing
const supplierRoutes = require("./routes/supplier_route");
const productRoutes = require("./routes/product_route");
const orderRoutes = require("./routes/supplierorder_route");
const discountRoutes = require("./routes/discount_routes");

// 🔹 Register Routes
// app.use("/api/sales", salesRoutes);  // ✅ Added Sales Routes
// app.use("/api/returns", returnRoutes); // Commented out as the file is missing
app.use("/api/supplier", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/discounts", discountRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🚨 Error:", err.stack);
  res.status(500).send({ error: "Internal Server Error" });
});

// Start Server with Port Conflict Handling
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use`);
    const newPort = Number(PORT) + 1;
    console.log(`🔄 Trying to use port ${newPort}`);
    server.listen(newPort);
  } else {
    console.error('❌ Server error:', err);
  }
});

// Graceful Shutdown Handling
process.on('SIGTERM', () => {
  console.log('🔻 Server shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
