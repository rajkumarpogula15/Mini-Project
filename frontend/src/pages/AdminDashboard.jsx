import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout"; // reuse sidebar layout

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard 🛠️</h1>
        <p className="text-gray-700 mb-2">Welcome, Admin. Use the sidebar to manage users, vendors, and bookings.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">📦 Vendors</h2>
            <p className="text-sm text-gray-500">View, approve or block vendor profiles.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">📅 Bookings</h2>
            <p className="text-sm text-gray-500">View all platform booking activity.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">👥 Users</h2>
            <p className="text-sm text-gray-500">Manage organizers, vendors, and attendees.</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default AdminDashboard;
