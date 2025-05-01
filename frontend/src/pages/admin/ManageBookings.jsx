import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/AdminLeftbar";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/bookings/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Bookings 📅</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded shadow">
              <p><strong>📆 Date:</strong> {new Date(b.eventDate).toLocaleDateString()}</p>
              <p><strong>🧑 Organizer:</strong> {b.organizerId?.name} ({b.organizerId?.email})</p>
              <p><strong>🏷 Vendor:</strong> {b.vendorId?.name} ({b.vendorId?.category})</p>
              <p><strong>📝 Message:</strong> {b.message}</p>
              <p className="text-sm text-gray-500 mt-1">Created: {new Date(b.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
}

export default ManageBookings;
