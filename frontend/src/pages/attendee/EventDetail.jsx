import { useEffect, useState } from "react";
import axios from "axios";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState(new Set());
  const [loadingJoin, setLoadingJoin] = useState(null);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events:", err.message);
      }
    };

    const fetchJoinedEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/attendees/my-events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const joinedIds = new Set(res.data.map((e) => e._id));
        setJoinedEvents(joinedIds);
      } catch (err) {
        console.error("Failed to load joined events:", err.message);
      }
    };

    fetchEvents();
    fetchJoinedEvents();
  }, [token]);

  const handleJoin = async (eventId) => {
    if (loadingJoin) return;

    setLoadingJoin(eventId);

    try {
      await axios.post(
        "http://localhost:5000/api/attendees/register",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJoinedEvents((prev) => new Set(prev).add(eventId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join event");
    } finally {
      setLoadingJoin(null);
    }
  };

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AttendeeSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">🎉 Explore Events</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((event) => (
          <div key={event._id} className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold text-indigo-600">{event.title}</h3>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            <button
              onClick={() => handleJoin(event._id)}
              disabled={joinedEvents.has(event._id) || loadingJoin === event._id}
              className={`mt-2 px-4 py-1 rounded text-white ${
                joinedEvents.has(event._id)
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {joinedEvents.has(event._id)
                ? "Joined"
                : loadingJoin === event._id
                ? "Joining..."
                : "Join"}
            </button>
          </div>
        ))}
      </div>
    </AttendeeSidebarLayout>
  );
}

export default ExploreEvents;
