const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { ProfileInfo , UpdateProfile} = require("../controllers/infoController")

// GET Profile Route
router.get("/getProfile", protect, ProfileInfo);
router.put('/updateProfile', protect, UpdateProfile);

module.exports = router;
