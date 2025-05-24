import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/AdminLeftbar";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Unauthorized: No token provided");

      const res = await axios.get("http://localhost:5000/api/bookings/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
  if (!window.confirm("Are you sure you want to delete this booking?")) return;

  try {
    const token = localStorage.getItem("userToken");
    await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookings((prev) => prev.filter((b) => b._id !== bookingId));
  } catch (err) {
    console.error("Delete error:", err);
    alert(err.response?.data?.message || "Failed to delete booking");
  }
};


  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Bookings 📅</h1>

      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded shadow">
  <p><strong>📆 Date:</strong> {new Date(b.eventDate).toLocaleDateString()}</p>
  <p><strong>🧑 Organizer:</strong> {b.organizer?.name} ({b.organizer?.email})</p>
  <p><strong>🏷 Expert:</strong> {b.vendor?.name} ({b.vendor?.category})</p>
  <p><strong>📝 Message:</strong> {b.message}</p>
  <p className="text-sm text-gray-500 mt-1">Created: {new Date(b.createdAt).toLocaleString()}</p>

  <button
    onClick={() => handleDelete(b._id)}
    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
  >
    Delete
  </button>
</div>

          ))}
        </div>
      )}
    </SidebarLayout>
  );
}

export default ManageBookings;
