import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getMyEvents,
  downloadCertificate,
} from "../controllers/attendeeController.js";

const router = express.Router();

// Get all events attended by the logged-in user
router.get("/myevents", protect, getMyEvents);

// Download certificate
router.get("/certificate/:eventId", protect, downloadCertificate);

export default router;
