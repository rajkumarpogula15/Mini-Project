import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "../../components/CreateEventModal";
import BookVendorsModal from "../../components/BookVendorsModal";
import EventCard from "../../components/EventCard";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/events/myevents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const openBookingModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsBookingModalOpen(true);
  };

  const editEvent = (event) => {
    alert("Edit coming soon! Event ID: " + event._id);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <OrganizerSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">🗓️ Manage Your Events</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add Event
        </button>
      </div>

      <CreateEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEventAdded={fetchEvents}
      />

      <BookVendorsModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        eventId={selectedEventId}
      />

      {events.length === 0 ? (
        <p className="text-gray-500">No events added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={deleteEvent}
              onEdit={editEvent}
              onBookVendors={openBookingModal}
            />
          ))}
        </div>
      )}
    </OrganizerSidebarLayout>
  );
}

export default ManageEvents;
