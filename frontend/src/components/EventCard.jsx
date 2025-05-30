import React, { useState } from "react";
import AttendeeList from "./AttendeeList"; // assuming you have AttendeeList component

function EventCard({ event, onDelete, onEdit, attendeeCount, token }) {
  const [showAttendees, setShowAttendees] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Attendees Registered:</strong> {attendeeCount ?? 0}</p>

      <div className="mt-3 flex gap-4">
        <button onClick={() => onEdit(event)} className="text-blue-500">✏️ Edit</button>
        <button onClick={() => onDelete(event._id)} className="text-red-500">🗑️ Delete</button>
        <button
          onClick={() => setShowAttendees(!showAttendees)}
          className="text-green-600"
        >
          {showAttendees ? "Hide Attendees" : "Show Attendees"}
        </button>
      </div>

      {showAttendees && (
        <div className="mt-4 border-t pt-4">
          <AttendeeList eventId={event._id} token={token} />
        </div>
      )}
    </div>
  );
}

export default EventCard;
