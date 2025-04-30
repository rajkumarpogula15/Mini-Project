import { useEffect, useState } from "react";
import axios from "axios";

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vendors/all");
        setVendors(res.data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((v) =>
    v.category.toLowerCase().includes(filter.toLowerCase()) ||
    v.location.toLowerCase().includes(filter.toLowerCase())
  );

  const handleBooking = async (vendorId) => {
    const eventDate = prompt("Enter event date (YYYY-MM-DD):");
    const message = prompt("Message for the vendor:");

    if (!eventDate) return;

    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          vendorId,
          eventDate,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking request sent ✅");
    } catch (err) {
      console.error("Booking failed:", err.message);
      alert("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Available Vendors</h1>

      <input
        type="text"
        placeholder="Search by category or location"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-lg mx-auto mb-6 p-3 border border-gray-300 rounded block"
      />

      {filteredVendors.length === 0 ? (
        <p className="text-center text-gray-500">No vendors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-white p-4 shadow rounded flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-1">
                  {vendor.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  📍 {vendor.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  📂 {vendor.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  💰 {vendor.priceRange}
                </p>
                <p className="text-sm text-gray-600">
                  📅 {vendor.availableDates?.length} dates available
                </p>
              </div>
              <button
                onClick={() => handleBooking(vendor._id)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorList;
