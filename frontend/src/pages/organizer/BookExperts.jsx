import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";

function BookExperts() {
  const [experts, setExperts] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("userToken");

  const fetchExperts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/experts/all");
      setExperts(res.data);
    } catch (err) {
      console.error("Failed to load experts:", err.message);
      setError("Failed to load experts.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (expertId) => {
    const eventDate = prompt("Enter event date (YYYY-MM-DD):");
    if (!eventDate) return alert("Event date is required.");

    const message = prompt("Optional message for the expert:");

    try {
      await axios.post(
        
        "http://localhost:5000/api/bookings",
        { expertId, eventDate, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking request sent ✅");
    } catch (err) {
      console.error("Booking failed:", err.message);
      alert("Booking failed ❌");
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const filtered = experts.filter((expert) => {
    const category = expert.category?.toLowerCase() || "";
    const location = expert.location?.toLowerCase() || "";
    const filterText = filter.toLowerCase();
    return category.includes(filterText) || location.includes(filterText);
  });

  return (
    <OrganizerSidebarLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">📦 Book Experts</h1>

        <input
          type="text"
          placeholder="Search by category or location"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-lg mx-auto block mb-6 p-3 border border-gray-300 rounded"
        />

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-500">No matching experts found.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((expert) => (
              <div key={expert._id} className="bg-white shadow p-4 rounded">
                <h3 className="text-xl font-semibold text-indigo-600">{expert.name}</h3>
                <p className="text-sm text-gray-600">📍 {expert.location || "N/A"}</p>
                <p className="text-sm text-gray-600">📂 {expert.category || "N/A"}</p>
                <p className="text-sm text-gray-600">💰 {expert.priceRange || "N/A"}</p>
                <p className="text-sm text-gray-600">
                  📅 {expert.availableDates?.length || 0} dates available
                </p>

                <button
                  onClick={() => handleBooking(expert._id)}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </OrganizerSidebarLayout>
  );
}

export default BookExperts;
