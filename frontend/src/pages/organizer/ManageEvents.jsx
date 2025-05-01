import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "../../components/CreateEventModal";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/events/myevents", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents(); // refresh
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <OrganizerSidebarLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">🗓️ Manage Your Events</h1>

        <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
            >
            ➕ Create New Event
            </button>

            <CreateEventModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onEventCreated={fetchEvents}
            />


        {events.length === 0 ? (
          <p className="text-gray-500">No events found. Create one to get started!</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event._id} className="bg-white shadow p-4 rounded">
                <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>

                <div className="mt-2 flex gap-3">
                  <button className="text-blue-500" onClick={() => alert("Edit event soon!")}>✏️ Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(event._id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </OrganizerSidebarLayout>
  );
}

export default ManageEvents;
