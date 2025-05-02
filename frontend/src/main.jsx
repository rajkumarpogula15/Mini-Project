import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import MyEvents from './pages/MyEvents.jsx';
import RegisterVendor from './pages/RegisterVendor.jsx';
import VendorList from './pages/VendorList.jsx';
// import VendorDashboard from './pages/VendorDashboard.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import AdminDashboard from './pages/AdminDashboard';
import ManageVendors from './pages/admin/ManageVendors';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';
import ManageEvents from './pages/organizer/ManageEvents';
import BookVendors from './pages/organizer/BookVendors.jsx';
import VendorDashboard from "./pages/vendor/VendorDashboard.jsx";
import VendorBookings from "./pages/vendor/VendorBookings.jsx";
import VendorEarnings from "./pages/vendor/VendorEarnings.jsx";
import VendorReviews from "./pages/vendor/VendorReviews.jsx";
import VendorProfile from "./pages/vendor/VendorProfile.jsx";
import ManageServices from "./pages/vendor/ManageServices.jsx";
import VendorRoute from "./routes/VendorRoute";
import AdminRoute from "./routes/AdminRoutes.jsx";
import OrganizerRoute from "./routes/OrganizerRoute";
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/register-vendor" element={<RegisterVendor />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/booking/:id" element={<BookingConfirmation />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/vendors" element={<AdminRoute><ManageVendors /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />

        <Route path="/organizer/events" element={<ManageEvents />} />
        <Route path="/organizer/vendors/book" element={<BookVendors />} />

        {/* Vendor Routes */}
        <Route path="/vendor/dashboard" element={<VendorRoute><VendorDashboard /></VendorRoute>} />
        <Route path="/vendor/services" element={<VendorRoute><ManageServices /></VendorRoute>} />
        <Route path="/vendor/bookings" element={<VendorRoute><VendorBookings /></VendorRoute>} />
        <Route path="/vendor/earnings" element={<VendorRoute><VendorEarnings /></VendorRoute>} />
        <Route path="/vendor/reviews" element={<VendorRoute><VendorReviews /></VendorRoute>} />
        <Route path="/vendor/profile" element={<VendorRoute><VendorProfile /></VendorRoute>} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
