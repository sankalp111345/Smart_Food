const express = require("express");
const { protect, isFarmer, isWarehouseOwner } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
    addWarehouse,
    getWarehousesForOwner,
    getAllWarehouses,
    getWarehouseById,
    editWarehouse,
    deleteWarehouse
} = require("../controllers/warehouseController");

// const { getWarehouses, addWarehouse } = require("../controllers/warehouseController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
// router.route("/").get(protect, getWarehouses).post(addWarehouse);
// router.post("/addWarehouse",protect, addWarehouse);
// router.get("/getWarehouses",protect, getWarehouses);

// Warehouse Owner can add a warehouse
router.post("/addwarehouse", protect, isWarehouseOwner, upload.single("image"), addWarehouse);

// Farmers can see all warehouses
router.get("/getWarehouses", protect, isFarmer, getAllWarehouses);

// Warehouse Owners can see only their warehouses
router.get("/myWarehouses", protect, isWarehouseOwner, getWarehousesForOwner);

router.get("/:id", protect, isFarmer, getWarehouseById);

router.put("/edit/:id", protect, isWarehouseOwner, upload.single("image"), editWarehouse);

router.delete("/delete/:id",protect, isWarehouseOwner, deleteWarehouse);


module.exports = router;
