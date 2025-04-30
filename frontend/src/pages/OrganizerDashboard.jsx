import { useEffect, useState } from "react";
import axios from "axios";

function OrganizerDashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/bookings/organizer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load organizer bookings:", err.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Organizer Dashboard 👑</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings made yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow p-4 rounded">
              <p><strong>Vendor ID:</strong> {booking.vendor}</p>
              <p><strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className="capitalize">{booking.status}</span></p>
              <p><strong>Message:</strong> {booking.message || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrganizerDashboard;
