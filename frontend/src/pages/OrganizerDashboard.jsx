import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrganizerSidebarLayout from "../components/OrganizerSidebarLayout";

function OrganizerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const [bookings, setBookings] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [vendorsBookedCount, setVendorsBookedCount] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [topVendors, setTopVendors] = useState([]);

  const handleCancel = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;
  
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/cancel/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking cancelled.");
      fetchDashboardData(); // Refresh data
    } catch (err) {
      console.error("Cancel failed:", err.message);
      alert("Something went wrong.");
    }
  };
  

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Bookings
      const bookingsRes = await axios.get("http://localhost:5000/api/bookings/organizer", { headers });
      setBookings(bookingsRes.data);
      setPendingBookings(bookingsRes.data.filter(b => b.status === "pending").length);
      setVendorsBookedCount(bookingsRes.data.length);

      // Events
      const eventsRes = await axios.get("http://localhost:5000/api/events/myevents", { headers });
      setEventCount(eventsRes.data.length);

      // Top Vendors
      const vendorRes = await axios.get("http://localhost:5000/api/bookings/top-vendors", { headers });
      setTopVendors(vendorRes.data);

      // Profile completion
      const profileRes = await axios.get("http://localhost:5000/api/users/profile", { headers });
      const profile = profileRes.data;
      const fields = ["name", "email", "phone", "bio", "photo"];
      const filled = fields.filter(field => profile[field]);
      const completion = Math.round((filled.length / fields.length) * 100);
      setProfileCompletion(completion);

      // Optional: static review count
      setReviewCount(5);

    } catch (err) {
      console.error("Dashboard fetch failed:", err.message);
    }
  };

  return (
    <OrganizerSidebarLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">Organizer Dashboard 👑</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="🎉 Events" value={eventCount} />
        <StatCard label="📦 Vendors Booked" value={vendorsBookedCount} />
        <StatCard label="⏳ Pending" value={pendingBookings} />
        <StatCard label="⭐ Reviews" value={reviewCount} />
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/organizer/events")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          📤 Create New Event
        </button>
        <button
          onClick={() => navigate("/organizer/vendors/book")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🔎 Find Vendors
        </button>
        <button
          onClick={() => navigate("/organizer/share")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          📩 Share Event Page
        </button>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl font-semibold mb-3">Recent Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings made yet.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow p-4 rounded">
              <p><strong>Vendor ID:</strong> {booking.vendor}</p>
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
  <button
    onClick={() => handleCancel(booking._id)}
    className="mt-2 inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
  >
    Cancel Booking
  </button>
)}

              <p><strong>Message:</strong> {booking.message || "—"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Profile Completion */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">👤 Profile Completion</h2>
        <div className="bg-gray-200 h-4 w-full rounded">
          <div className="bg-blue-500 h-4 rounded" style={{ width: `${profileCompletion}%` }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{profileCompletion}% complete – Add more info to improve trust.</p>
      </div>

      {/* Top Booked Vendors */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🏆 Top Booked Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topVendors.map((v) => (
            <div key={v._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-blue-600">{v.vendorDetails?.name || "Vendor"}</h3>
              <p className="text-sm text-gray-500">{v.vendorDetails?.category || "Service"}</p>
              <p className="text-sm">📅 {v.count} bookings</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🔔 Notifications</h2>
        <ul className="bg-white p-4 rounded shadow text-sm space-y-2">
          <li>✅ Booking confirmed by DJMax</li>
          <li>❌ Vendor PhotoPro declined your request</li>
          <li>💬 New review from an attendee</li>
        </ul>
      </div>
    </OrganizerSidebarLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default OrganizerDashboard;
