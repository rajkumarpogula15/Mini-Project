import Vendor from '../models/Vendor.js';

// @desc Create a new vendor
// @route POST /api/vendors
// @access Private
export const createVendor = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      priceRange,
      location,
      availableDates,
      images
    } = req.body;

    const newVendor = new Vendor({
      name,
      category,
      description,
      priceRange,
      location,
      availableDates,
      images,
      createdBy: req.user._id
    });

    const saved = await newVendor.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
