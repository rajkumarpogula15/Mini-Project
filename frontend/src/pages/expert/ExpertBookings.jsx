import { useEffect, useState } from "react";
import axios from "axios";
import ExpertSidebarLayout from "../../components/ExpertSidebarLayout";
import { toast } from "sonner";

const ExpertBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for logged-in expert
  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings/expert", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Make sure bookings is an array before setting
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Update booking status (accept/reject)
  const handleResponse = async (id, status) => {
    try {
      await axios.put(
        `/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Booking ${status} successfully`);
      // Refresh bookings after status update
      fetchBookings();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update booking status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ExpertSidebarLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No bookings found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Booking from {booking.organizer?.name || "Organizer"}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Email: {booking.organizer?.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Phone: {booking.organizer?.phone}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Event Date: {new Date(booking.eventDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Message: {booking.message || "No message"}
                </p>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    Status: {booking.status}
                  </span>
                </div>

                {booking.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleResponse(booking._id, "accepted")}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleResponse(booking._id, "rejected")}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ExpertSidebarLayout>
  );
};

export default ExpertBookings;
