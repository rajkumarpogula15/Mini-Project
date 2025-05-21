// models/Expert.js
import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true }, // 🔁 changed from category
  bio: { type: String },
  skills: [String], // 🔁 new: for listing technical skills
  priceRange: String, // ₹500 - ₹2000 per session
  location: String,
  availability: [Date], // 🔁 more accurate name than availableDates
  photo: String, // 🔁 single profile photo instead of array
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Expert = mongoose.model('Expert', expertSchema);
export default Expert;
