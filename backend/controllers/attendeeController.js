import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import path from "path";
import fs from "fs";

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ user: userId }).populate("event");

    const events = registrations.map((r) => r.event);
    res.json(events);
  } catch (err) {
    console.error("Fetch my events failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const downloadCertificate = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const reg = await Registration.findOne({ user: userId, event: eventId });
    if (!reg) {
      return res.status(404).json({ message: "You are not registered for this event." });
    }

    const filePath = path.join("certificates", `${eventId}.pdf`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Certificate not available yet." });
    }

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
