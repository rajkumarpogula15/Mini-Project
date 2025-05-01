import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createEvent, getMyEvents, deleteEvent, updateEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/myevents', protect, getMyEvents);
router.delete('/:id', protect, deleteEvent);
router.put('/:id', protect, updateEvent);

// Get all events created by the organizer
router.get('/myevents', protect, async (req, res) => {
    try {
      const events = await Event.find({ createdBy: req.user._id }).sort({ date: -1 });
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', protect, async (req, res) => {
    try {
      const { title, description, date, location } = req.body;
  
      const event = await Event.create({
        title,
        description,
        date,
        location,
        createdBy: req.user._id
      });
  
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get('/myevents', protect, async (req, res) => {
    const events = await Event.find({ createdBy: req.user._id });
    res.json(events);
  });
  
  // GET /api/events/myevents
router.get('/myevents', protect, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
