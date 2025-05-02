import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";

function BookVendors() {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("userToken");

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vendors/all");
      setVendors(res.data);
    } catch (err) {
      console.error("Failed to load vendors:", err.message);
    }
  };

  const handleBooking = async (vendorId) => {
    const eventDate = prompt("Enter event date (YYYY-MM-DD):");
    const message = prompt("Optional message for the vendor:");
    if (!eventDate) return;

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { vendorId, eventDate, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking request sent ✅");
    } catch (err) {
      console.error("Booking failed:", err.message);
      alert("Booking failed ❌");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filtered = vendors.filter((v) =>
    v.category.toLowerCase().includes(filter.toLowerCase()) ||
    v.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <OrganizerSidebarLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">📦 Book Vendors</h1>

        <input
          type="text"
          placeholder="Search by category or location"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-lg mx-auto block mb-6 p-3 border border-gray-300 rounded"
        />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No matching vendors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((vendor) => (
              <div key={vendor._id} className="bg-white shadow p-4 rounded">
                <h3 className="text-xl font-semibold text-indigo-600">{vendor.name}</h3>
                <p className="text-sm text-gray-600">📍 {vendor.location}</p>
                <p className="text-sm text-gray-600">📂 {vendor.category}</p>
                <p className="text-sm text-gray-600">💰 {vendor.priceRange || "N/A"}</p>
                <p className="text-sm text-gray-600">
                  📅 {vendor.availableDates?.length || 0} dates available
                </p>

                <button
                  onClick={() => handleBooking(vendor._id)}
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

export default BookVendors;
