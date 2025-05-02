import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Booking from '../models/Booking.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { vendorId, eventDate, message } = req.body;

    const booking = new Booking({
      organizer: req.user._id,
      vendor: vendorId,
      eventDate,
      message,
    });

    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = req.body.status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/vendor', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ vendor: req.user._id })
      .populate('organizer', 'name email phone') // Add this line
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bookings for logged-in organizer
router.get('/organizer', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ organizer: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin-only: Get all bookings
router.get('/admin/all', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('vendorId', 'name category location')
      .populate('organizerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings/top-vendors
router.get('/top-vendors', protect, async (req, res) => {
  try {
    const topVendors = await Booking.aggregate([
      { $match: { organizer: req.user._id } },
      { $group: { _id: "$vendor", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "_id",
          as: "vendorDetails"
        }
      },
      { $unwind: "$vendorDetails" }
    ]);

    res.json(topVendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/bookings/cancel/:id - Organizer cancels booking
router.put('/cancel/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    booking.status = 'cancelled';
    booking.cancelledBy = 'organizer';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
