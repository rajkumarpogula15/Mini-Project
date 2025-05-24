import { useEffect, useState } from "react";
import axios from "axios";
import AdminLeftbar from "../../components/AdminLeftbar";
function AdminManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch events:", err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <AdminLeftbar>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-indigo-600">📅 Manage Events</h1>

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div key={event._id} className="bg-white shadow-md rounded p-4">
                <h2 className="text-lg font-semibold text-blue-700">{event.title}</h2>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Organizer ID:</strong> {event.createdBy}</p>
                <p><strong>Budget:</strong> ₹{event.budget || "—"}</p>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>

                <button
                  onClick={() => handleDelete(event._id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLeftbar>
  );
}

export default AdminManageEvents;
