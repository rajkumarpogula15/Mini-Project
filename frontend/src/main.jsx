import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import MyEvents from './pages/MyEvents.jsx'
import BookingConfirmation from './pages/BookingConfirmation.jsx'

import AdminDashboard from './pages/AdminDashboard'
import ManageVendors from './pages/admin/ManageVendors'
import ManageUsers from './pages/admin/ManageUsers'
import ManageBookings from './pages/admin/ManageBookings'

import ManageEvents from './pages/organizer/ManageEvents'
import BookVendors from './pages/organizer/BookVendors.jsx'

import Contact from './components/Contact.jsx'

// ✅ Expert Pages (formerly vendor)
import ExpertDashboard from "./pages/expert/ExpertDashboard.jsx"
import ManageServices from "./pages/expert/ManageServices.jsx"
import ExpertBookings from "./pages/expert/ExpertBookings.jsx"
import ExpertEarnings from "./pages/expert/ExpertEarnings.jsx"
import ExpertReviews from "./pages/expert/ExpertReviews.jsx"
import ExpertProfile from "./pages/expert/ExpertProfile.jsx"


// attende imports
import AttendeeDashboard from './pages/attendee/Dashboard.jsx'
import AttendeeMyEvents from './pages/attendee/MyEvents.jsx'
import ExploreEvents from './pages/attendee/EventDetail.jsx'

// ✅ Route Protection
import ExpertRoute from "./routes/ExpertRoute"
import AdminRoute from "./routes/AdminRoutes.jsx"
import OrganizerRoute from "./routes/OrganizerRoute"

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

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/vendors" element={<AdminRoute><ManageVendors /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />

        {/* Organizer Routes */}
        <Route path="/organizer/events" element={<OrganizerRoute><ManageEvents /></OrganizerRoute>} />
        <Route path="/organizer/vendors/book" element={<OrganizerRoute><BookVendors /></OrganizerRoute>} />

        {/* Expert Routes */}
        <Route path="/expert/dashboard" element={<ExpertRoute><ExpertDashboard /></ExpertRoute>} />
        <Route path="/expert/services" element={<ExpertRoute><ManageServices /></ExpertRoute>} />
        <Route path="/expert/bookings" element={<ExpertRoute><ExpertBookings /></ExpertRoute>} />
        <Route path="/expert/earnings" element={<ExpertRoute><ExpertEarnings /></ExpertRoute>} />
        <Route path="/expert/reviews" element={<ExpertRoute><ExpertReviews /></ExpertRoute>} />
        <Route path="/expert/profile" element={<ExpertRoute><ExpertProfile /></ExpertRoute>} />

        {/* {attende routes} */}
        <Route path="/attendee/dashboard" element={<AttendeeDashboard />} />
        <Route path="/attendee/myevents" element={<AttendeeMyEvents />} />
        <Route path="/attendee/events" element={<ExploreEvents />} />
        

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
