import { useEffect, useState } from "react";
import VendorSidebarLayout from "../../components/VendorSidebarLayout";
import axios from "axios";

function VendorDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    earnings: 0,
    reviews: 0
  });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [services, bookings, earnings, reviews] = await Promise.all([
          axios.get("http://localhost:5000/api/vendors/myservices", { headers }),
          axios.get("http://localhost:5000/api/bookings/vendor", { headers }),
          axios.get("http://localhost:5000/api/vendors/earnings", { headers }),
          axios.get("http://localhost:5000/api/vendors/reviews", { headers }),
        ]);

        setStats({
          services: services.data.length,
          bookings: bookings.data.length,
          earnings: earnings.data.total || 0,
          reviews: reviews.data.length
        });

      } catch (err) {
        console.error("Vendor stats fetch failed:", err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <VendorSidebarLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Vendor 📦</h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard label="🛠 Services" value={stats.services} />
        <StatCard label="📅 Bookings" value={stats.bookings} />
        <StatCard label="💰 Earnings (₹)" value={stats.earnings} />
        <StatCard label="⭐ Reviews" value={stats.reviews} />
      </div>
    </VendorSidebarLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default VendorDashboard;
