import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import User from '../models/User.js'; // ✅ missing import added

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

// Admin-only: Get all users
router.get('/admin/users', protect, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error("Error in /admin/users:", err.message); // optional
    res.status(500).json({ message: err.message });
  }
});

// DELETE a user
router.delete('/admin/users/:id', protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TOGGLE block/unblock user
router.put('/admin/users/:id/block', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.blocked = !user.blocked;
    await user.save();
    res.json({ message: `User ${user.blocked ? 'blocked' : 'unblocked'}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
