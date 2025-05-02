import express from 'express';
import { createVendor } from '../controllers/vendorController.js';
import { protect } from '../middlewares/authMiddleware.js';
import Vendor from '../models/Vendor.js';
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Register a vendor
router.post('/', protect, createVendor);

// ✅ Get all vendors (public)
router.get('/all', async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get services created by the logged-in vendor
router.get('/myservices', protect, async (req, res) => {
  try {
    const vendorServices = await Vendor.find({ createdBy: req.user._id });
    res.json(vendorServices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a service (only by creator)
router.delete('/:id', protect, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    if (vendor.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await vendor.deleteOne();
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Edit a service (only by creator)
router.put('/:id', protect, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    if (vendor.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(vendor, req.body);
    const updated = await vendor.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Calculate earnings for logged-in vendor
router.get('/earnings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      vendor: req.user._id,
      status: 'accepted'
    });

    // Simulate price field (you may want to store actual price in booking later)
    const totalEarnings = bookings.length * 5000; // Example: ₹5000 per booking
    res.json({ totalEarnings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dummy review count (you can replace with real review model later)
router.get('/reviews', protect, async (req, res) => {
  try {
    // Replace this logic once review model is implemented
    const dummyReviewCount = 12;
    res.json({ count: dummyReviewCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Admin-only: Approve/Reject vendor
router.put('/admin/update/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.status = req.body.status; // 'approved' or 'rejected'
    await vendor.save();

    res.json({ message: `Vendor ${vendor.status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
