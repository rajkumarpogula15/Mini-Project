import express from 'express';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import Booking from '../models/Booking.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin summary counts
router.get('/summary', protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.json({ totalUsers, totalVendors, totalBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
