const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/warehouses", require("./routes/warehouseRoutes"));
app.use("/api/logistics", require("./routes/logisticsRoutes"));
app.use("/api/profile", require("./routes/profileRoute"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
