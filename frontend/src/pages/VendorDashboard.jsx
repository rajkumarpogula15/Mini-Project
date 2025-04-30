import { useEffect, useState } from "react";
import axios from "axios";

function VendorDashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/bookings/vendor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err.message);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings(); // refresh
    } catch (err) {
      console.error("Failed to update booking:", err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Vendor Dashboard</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-4 shadow rounded">
              <p><strong>Event Date:</strong> {new Date(b.eventDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className="capitalize">{b.status}</span></p>
              <p><strong>Message:</strong> {b.message}</p>
              <p><strong>Organizer ID:</strong> {b.organizer}</p>

              {b.status === "pending" && (
                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => handleUpdate(b._id, "accepted")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdate(b._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;
