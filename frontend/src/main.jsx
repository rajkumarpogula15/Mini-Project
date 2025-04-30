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
import VendorDashboard from './pages/VendorDashboard.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import AdminDashboard from './pages/AdminDashboard';
import ManageVendors from './pages/admin/ManageVendors';
import ManageUsers from './pages/admin/ManageUsers';
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/vendors" element={<ManageVendors />} />
        <Route path="/admin/users" element={<ManageUsers />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
