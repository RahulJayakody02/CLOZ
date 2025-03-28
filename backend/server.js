const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const customerRoutes = require("./routes/customerRoutes");
//const loyaltyRoutes = require("./routes/loyaltyRoutes");

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.use("/api/customers", customerRoutes);
//app.use("/api/loyalty", loyaltyRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
