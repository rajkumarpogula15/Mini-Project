import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendeeList = ({ eventId, token }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendees = async () => {
    try {
      const res = await axios.get(`/api/attendees/event/${eventId}/attendees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Attendees response data:", res.data); // Debug log

      // Check if data is array before setting state
      if (Array.isArray(res.data)) {
        setAttendees(res.data);
      } else {
        // If not an array, something unexpected was returned
        setError("Unexpected data format received");
        setAttendees([]);
      }
    } catch (err) {
      console.error("Failed to load attendees:", err);
      setError("Failed to load attendees");
      setAttendees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId && token) {
      fetchAttendees();
    }
  }, [eventId, token]);

  if (loading) {
    return <p>Loading attendees...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (!Array.isArray(attendees) || attendees.length === 0) {
    return <p>No attendees found.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Attendee List</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Check-in</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={attendee._id} className="text-sm">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{attendee.name}</td>
              <td className="border px-4 py-2">{attendee.email}</td>
              <td className="border px-4 py-2">{attendee.phone}</td>
              <td className="border px-4 py-2">
                {attendee.checkedIn ? (
                  <span className="text-green-600 font-semibold">✔</span>
                ) : (
                  <span className="text-gray-500">❌</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {new Date(attendee.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeeList;
