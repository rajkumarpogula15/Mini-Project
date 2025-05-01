import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrganizerSidebarLayout from "../components/OrganizerSidebarLayout";

function OrganizerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [vendorsBookedCount, setVendorsBookedCount] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const navigate = useNavigate();


  const token = localStorage.getItem("userToken");

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
  
      // Fetch bookings
      const bookingsRes = await axios.get("http://localhost:5000/api/bookings/organizer", { headers });
      setBookings(bookingsRes.data);
      setPendingBookings(bookingsRes.data.filter(b => b.status === "pending").length);
      setVendorsBookedCount(bookingsRes.data.length);
  
      // Fetch events
      const eventsRes = await axios.get("http://localhost:5000/api/events/myevents", { headers });
      setEventCount(eventsRes.data.length);
  
      // Fetch reviews (optional)
      // const reviewsRes = await axios.get("http://localhost:5000/api/reviews/organizer", { headers });
      // setReviewCount(reviewsRes.data.length);
  
      // Profile completion
      const profileRes = await axios.get("http://localhost:5000/api/users/profile", { headers });
      const profile = profileRes.data;
      const filled = ["name", "email", "phone", "bio", "photo"].filter(field => profile[field]);
      const completion = Math.round((filled.length / 5) * 100);
      setProfileCompletion(completion);
  
    } catch (err) {
      console.error("Dashboard data fetch failed:", err.message);
    }
  };
  

  // const fetchMyBookings = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/bookings/organizer", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setBookings(res.data);

  //     // Example logic for stats
  //     setEventCount(3); // Replace with real API
  //     setVendorsBookedCount(res.data.length);
  //     setPendingBookings(res.data.filter(b => b.status === "pending").length);
  //     setReviewCount(5); // Replace with real review count API
  //   } catch (err) {
  //     console.error("Failed to load organizer bookings:", err.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchMyBookings();
  // }, []);

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


      {/* Bookings */}
      <h2 className="text-xl font-semibold mb-3">Recent Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings made yet.</p>
      ) : (
        <div className="space-y-4 mb-8">
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

      {/* Profile Completion Meter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">👤 Profile Completion</h2>
        <div className="bg-gray-200 h-4 w-full rounded">
          <div className="bg-blue-500 h-4 rounded" style={{ width: "75%" }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">75% complete – Add more info to improve trust.</p>
      </div>

      {/* Top Booked Vendors */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🏆 Top Booked Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((v) => (
            <div key={v} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-blue-600">Vendor {v}</h3>
              <p className="text-sm text-gray-500">Service Category</p>
              <p className="text-sm">⭐ 4.{v} Rating</p>
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
