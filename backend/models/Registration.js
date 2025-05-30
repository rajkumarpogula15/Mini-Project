// File: models/Registration.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  phone: String,
  checkedIn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Registration", registrationSchema);