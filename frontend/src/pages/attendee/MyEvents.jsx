import { useEffect, useState } from "react";
import axios from "axios";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

function AttendeeMyEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchMyEvents();
  }, [filter]);

  const fetchMyEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/myevents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered =
        filter === "all"
          ? res.data
          : res.data.filter((e) =>
              filter === "upcoming"
                ? new Date(e.date) > new Date()
                : new Date(e.date) <= new Date()
            );

      setEvents(filtered);
    } catch (err) {
      console.error("Error fetching attendee events:", err.message);
    }
  };

  return (
    <AttendeeSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">🎯 My Registered Events</h1>

      {/* Filters */}
      <div className="mb-6 space-x-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded ${
            filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-1 rounded ${
            filter === "upcoming" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1 rounded ${
            filter === "completed" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Event Cards */}
      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            const isCompleted = new Date(event.date) < new Date();
            return (
              <div key={event._id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold text-blue-700">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600">
                  📍 {event.location} | 📅{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {event.description}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isCompleted
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Upcoming"}
                  </span>

                  {isCompleted && (
                    <a
                      href={`http://localhost:5000/certificates/${event._id}.pdf`}
                      download
                      className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      🎓 Download Certificate
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AttendeeSidebarLayout>
  );
}

export default AttendeeMyEvents;
