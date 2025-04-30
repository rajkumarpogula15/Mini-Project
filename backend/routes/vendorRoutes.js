import express from 'express';
import { createVendor } from '../controllers/vendorController.js';
import { protect } from '../middlewares/authMiddleware.js';
import Vendor from '../models/Vendor.js'; // ✅ This was missing

const router = express.Router();

// Protected: Register a vendor
router.post('/', protect, createVendor);

// Public: Get all vendors
router.get('/all', async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin-only: Approve or Reject vendor
router.put('/admin/update/:id', protect, async (req, res) => {
  try {
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
