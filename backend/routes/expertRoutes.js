import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Expert from '../models/Expert.js'; // 🔁 Renamed model
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Register an expert
router.post('/', protect, async (req, res) => {
  try {
    const expert = new Expert({ ...req.body, createdBy: req.user._id });
    const saved = await expert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Public: Get all experts
router.get('/all', async (req, res) => {
  try {
    const experts = await Expert.find().sort({ createdAt: -1 });
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get services created by the logged-in expert
router.get('/myservices', protect, async (req, res) => {
  try {
    const expertServices = await Expert.find({ createdBy: req.user._id });
    res.json(expertServices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a service (only by creator)
router.delete('/:id', protect, async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) return res.status(404).json({ message: "Expert service not found" });
    if (expert.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await expert.deleteOne();
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Edit a service
router.put('/:id', protect, async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) return res.status(404).json({ message: "Expert service not found" });
    if (expert.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(expert, req.body);
    const updated = await expert.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Earnings for expert (calculated based on accepted bookings)
router.get('/earnings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      vendor: req.user._id,
      status: 'accepted'
    });

    const totalEarnings = bookings.length * 5000; // 💡 You can replace this with booking.price later
    res.json({ total: totalEarnings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Dummy reviews (can be replaced with real Review model)
router.get('/reviews', protect, async (req, res) => {
  try {
    const dummyReviewCount = 12; // Replace with real logic later
    res.json({ count: dummyReviewCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin-only: Approve/Reject expert
router.put('/admin/update/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ message: "Expert not found" });

    expert.status = req.body.status;
    await expert.save();

    res.json({ message: `Expert ${expert.status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
