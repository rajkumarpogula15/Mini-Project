import { useEffect, useState } from "react";
import axios from "axios";
import ExpertSidebarLayout from "../../components/ExpertSidebarLayout";

function ExpertBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("userToken");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/expert", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load expert bookings:", err.message);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error(`Failed to update booking:`, err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ExpertSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">📅 Expert Booking Requests</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white shadow p-4 rounded">
              <p><strong>Organizer:</strong> {b.organizer?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(b.eventDate).toLocaleDateString()}</p>
              <p><strong>Message:</strong> {b.message || "—"}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`capitalize font-semibold ${
                  b.status === "pending" ? "text-yellow-600" :
                  b.status === "accepted" ? "text-green-600" :
                  b.status === "rejected" ? "text-red-600" :
                  b.status === "cancelled" ? "text-gray-600" :
                  "text-gray-500"
                }`}>
                  {b.status}
                </span>
              </p>

              {b.status === "pending" && (
                <div className="mt-3 space-x-3">
                  <button
                    onClick={() => updateStatus(b._id, "accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ExpertSidebarLayout>
  );
}

export default ExpertBookings;
