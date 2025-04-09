const express = require("express");
const {
  createLogistics,
  getWarehouseLogistics,
  updateLogisticsStatus,
} = require("../controllers/logisticsController");
const { protect,isWarehouseOwner } = require("../middleware/authMiddleware");

const router = express.Router();

// Create logistics (Only for warehouse owners)
router.post("/create", protect, isWarehouseOwner, createLogistics);

// Get logistics for specific warehouse owner
router.get("/getLogistics", protect, isWarehouseOwner, getWarehouseLogistics);

// Update logistics status
router.put("/:logisticsId", protect, isWarehouseOwner, updateLogisticsStatus);

module.exports = router;
