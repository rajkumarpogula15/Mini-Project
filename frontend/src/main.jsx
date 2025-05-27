import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
// import './App.css';

// Public Pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import MyEvents from './pages/MyEvents.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import Contact from './pages/Contact.jsx';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import FAQ from './components/FAQ';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminManageEvents from './pages/admin/ManageEvents.jsx';
import AdminMessages from './pages/admin/Messages.jsx';
import ManageExperts from './pages/admin/ManageExperts.jsx';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';

// Organizer Pages
import ManageEvents from './pages/organizer/ManageEvents.jsx';
import BookVendors from './pages/organizer/BookExperts.jsx';
import OrganizerProfile from './pages/organizer/Profile';
import UploadMedia from './pages/organizer/UploadMedia.jsx';
import ShareEvent from './pages/organizer/ShareEvent.jsx';
import ExpertRecommendations from './pages/organizer/ExpertRecommendations.jsx';

// Expert Pages
import ExpertDashboard from './pages/expert/ExpertDashboard.jsx';
import ManageServices from './pages/expert/ManageServices.jsx';
import ExpertBookings from './pages/expert/ExpertBookings.jsx';
import ExpertEarnings from './pages/expert/ExpertEarnings.jsx';
import ExpertReviews from './pages/expert/ExpertReviews.jsx';
import ExpertProfile from './pages/expert/ExpertProfile.jsx';

// Attendee Pages
import AttendeeDashboard from './pages/attendee/Dashboard.jsx';
import AttendeeMyEvents from './pages/attendee/MyEvents.jsx';
import ExploreEvents from './pages/attendee/EventDetail.jsx';

// Route Guards
import AdminRoute from './routes/AdminRoutes.jsx';
import ExpertRoute from './routes/ExpertRoute.jsx';
import OrganizerRoute from './routes/OrganizerRoute.jsx';

// Optional 404 Page
import NotFound from './pages/NotFound.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/booking/:id" element={<BookingConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />


        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/experts" element={<AdminRoute><ManageExperts /></AdminRoute>} />
        <Route path="/admin/events" element={<AdminRoute><AdminManageEvents /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />

        {/* Organizer Routes */}
        <Route path="/organizer/events" element={<OrganizerRoute><ManageEvents /></OrganizerRoute>} />
        <Route path="/organizer/experts/book" element={<OrganizerRoute><BookVendors /></OrganizerRoute>} />
        <Route path="/organizer/profile" element={<OrganizerRoute><OrganizerProfile /></OrganizerRoute>} />
        <Route path="/organizer/media" element={<OrganizerRoute><UploadMedia /></OrganizerRoute>} />
        <Route path="/organizer/share" element={<OrganizerRoute><ShareEvent /></OrganizerRoute>} />
        <Route path="/organizer/experts/recommended" element={<OrganizerRoute><ExpertRecommendations /></OrganizerRoute>} />

        {/* Expert Routes */}
        <Route path="/expert/dashboard" element={<ExpertRoute><ExpertDashboard /></ExpertRoute>} />
        <Route path="/expert/services" element={<ExpertRoute><ManageServices /></ExpertRoute>} />
        <Route path="/expert/bookings" element={<ExpertRoute><ExpertBookings /></ExpertRoute>} />
        <Route path="/expert/earnings" element={<ExpertRoute><ExpertEarnings /></ExpertRoute>} />
        <Route path="/expert/reviews" element={<ExpertRoute><ExpertReviews /></ExpertRoute>} />
        <Route path="/expert/profile" element={<ExpertRoute><ExpertProfile /></ExpertRoute>} />

        {/* Attendee Routes */}
        <Route path="/attendee/dashboard" element={<AttendeeDashboard />} />
        <Route path="/attendee/myevents" element={<AttendeeMyEvents />} />
        <Route path="/attendee/events" element={<ExploreEvents />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
