import { useEffect, useState } from "react";
import axios from "axios";
import VendorSidebarLayout from "../../components/VendorSidebarLayout";

function VendorBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/vendor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load vendor bookings:", err.message);
      }
    };
    fetchBookings();
  }, []);

  return (
    <VendorSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">📅 Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white shadow p-4 rounded">
              <p><strong>Organizer:</strong> {b.organizer?.name || b.organizer}</p>
              <p><strong>Date:</strong> {new Date(b.eventDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className="capitalize">{b.status}</span></p>
              <p><strong>Message:</strong> {b.message}</p>
            </div>
          ))}
        </div>
      )}
    </VendorSidebarLayout>
  );
}

export default VendorBookings;
