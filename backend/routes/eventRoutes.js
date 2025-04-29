import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createEvent, getMyEvents, deleteEvent, updateEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/myevents', protect, getMyEvents);
router.delete('/:id', protect, deleteEvent);
router.put('/:id', protect, updateEvent);

export default router;
