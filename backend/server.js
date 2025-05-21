import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import userRoutes from './routes/userRoutes.js'; 
import eventRoutes from './routes/eventRoutes.js';
import expertRoutes from './routes/expertRoutes.js'; // vendors are experts now
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// API Routes
app.use('/api/users', userRoutes);         // Registration, login, profile
app.use('/api/events', eventRoutes);       // Events management
app.use('/api/experts', expertRoutes);     // Experts services (was /vendors)
app.use('/api/bookings', bookingRoutes);   // Bookings for experts
app.use('/api/admin', adminRoutes);        // Admin operations

// Health check
app.get('/', (req, res) => {
  res.send('Tech Event Management API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
