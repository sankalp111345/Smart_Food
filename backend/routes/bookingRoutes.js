const express = require('express');
const { createBooking, getFarmerBookings } = require('../controllers/bookingController');
const { protect, isFarmer } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createBooking', protect, isFarmer, createBooking);
router.get('/myBookings', protect, isFarmer, getFarmerBookings);

module.exports = router;
