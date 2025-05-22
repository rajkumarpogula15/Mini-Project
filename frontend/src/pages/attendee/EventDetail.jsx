// We'll start with route: /attendee/events

// ✅ File: src/pages/attendee/ExploreEvents.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

function ExploreEvents() {
  const [events, setEvents] = useState([]);
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
    fetchEvents();
  }, []);

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
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">Join</button>
          </div>
        ))}
      </div>
    </AttendeeSidebarLayout>
  );
}

export default ExploreEvents;
