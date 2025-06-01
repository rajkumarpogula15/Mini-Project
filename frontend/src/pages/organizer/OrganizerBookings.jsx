import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";

function OrganizerBookings() {
  const token = localStorage.getItem("userToken");
  const [bookings, setBookings] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/organizer", { headers });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {}, { headers });
      alert("Booking cancelled.");
      fetchBookings();
    } catch (err) {
      console.error("Cancel failed:", err.message);
      alert("Something went wrong while cancelling.");
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers });
      alert("Booking deleted.");
      fetchBookings();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <OrganizerSidebarLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">📖 All Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow p-4 rounded">
              <p><strong>Expert Name:</strong> {booking.expert ? booking.expert.name : "N/A"}</p>
              <p><strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`capitalize font-semibold ${
                  booking.status === "pending" ? "text-yellow-600" :
                  booking.status === "accepted" ? "text-green-600" :
                  booking.status === "rejected" ? "text-red-600" :
                  "text-gray-500"
                }`}>
                  {booking.status}
                </span>
              </p>

              {booking.status === "pending" && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete Booking
                  </button>
                </div>
              )}

              <p><strong>Message:</strong> {booking.message || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </OrganizerSidebarLayout>
  );
}

export default OrganizerBookings;
