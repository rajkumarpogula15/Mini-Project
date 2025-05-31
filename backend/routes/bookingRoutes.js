import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
router.post("/", protect, async (req, res) => {
  try {
    const { expertId, eventDate, message } = req.body;

    if (!expertId || !eventDate) {
      return res.status(400).json({ message: "expertId and eventDate are required." });
    }

    const booking = new Booking({
      organizer: req.user._id,
      expert: expertId,
      eventDate,
      message,
    });

    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
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

// @route   GET /api/bookings/expert
// @desc    Get bookings for logged-in expert
// router.get('/expert', protect, async (req, res) => {
//   try {
//     const bookings = await Booking.find({ expert: req.user._id })
//       .populate('organizer', 'name email phone')
//       .sort({ createdAt: -1 });

//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// @route   GET /api/bookings/expert
// @desc    Get all bookings for the logged-in expert
// @access  Private (Expert)
router.get("/expert", protect, async (req, res) => {
  try {
    console.log("🔍 GET /api/bookings/expert hit by:", req.user._id);

    const bookings = await Booking.find({ expert: req.user._id })
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    console.log("📦 Bookings found:", bookings.length);

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching expert bookings:", err);
    res.status(500).json({ message: "Server error fetching bookings." });
  }
});


// @route   GET /api/bookings/organizer
// @desc    Get bookings for logged-in organizer
router.get('/organizer', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ organizer: req.user._id })
      .populate('expert', 'name category location')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/bookings/admin/all
// @desc    Admin-only: Get all bookings
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookings = await Booking.find()
      .populate('expert', 'name category location')
      .populate('organizer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error in /admin/all:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/bookings/top-experts
// @desc    Get top 3 experts for logged-in organizer
router.get('/top-experts', protect, async (req, res) => {
  try {
    const topExperts = await Booking.aggregate([
      { $match: { organizer: req.user._id } },
      { $group: { _id: "$expert", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "vendors", // change this if your expert collection name differs
          localField: "_id",
          foreignField: "_id",
          as: "expertDetails"
        }
      },
      { $unwind: "$expertDetails" }
    ]);

    res.json(topExperts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/bookings/cancel/:id
// @desc    Organizer cancels a booking
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

// @route   DELETE /api/bookings/:id
// @desc    Admin deletes a booking
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error("Error deleting booking:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
